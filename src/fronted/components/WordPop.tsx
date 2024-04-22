import React from 'react';
import {
    autoPlacement,
    offset,
    useFloating,
    useInteractions
} from '@floating-ui/react';
import { YdRes } from '@/common/types/YdRes';
import { cn } from '@/common/utils/Util';

export interface WordSubParam {
    word: string;
    translation: YdRes | undefined;
    hoverColor: string;
}

const WordPop = React.forwardRef(
    (
        { word, translation, hoverColor }: WordSubParam,
        ref: React.ForwardedRef<HTMLDivElement | null>
    ) => {
        console.log('popper', translation);

        const { refs, floatingStyles, context } = useFloating({
            middleware: [
                // autoPlacement({ allowedPlacements: ['bottom'] }),
                offset(50),
                autoPlacement({
                    allowedPlacements: [
                        'top',
                        'bottom',
                        'top-start',
                        'top-end',
                        'bottom-start',
                        'bottom-end'
                    ]
                })
            ]
        });

        const { getReferenceProps, getFloatingProps } = useInteractions([]);

        const popper = () => {
            if (!translation) {
                return <div className="text-2xl">loading</div>;
            }
            console.log('aaaa', translation.query);
            return (
                <div
                    className={cn(
                        'select-text relative top-0 left-0 h-[500px] w-[500px] overflow-y-hidden flex flex-col items-start  bg-gray-100 text-gray-900 shadow-inner shadow-gray-100 drop-shadow-2xl rounded-2xl px-4 scrollbar-none',
                        translation?.webdict?.url && 'pt-4'
                    )}
                >
                    {translation?.webdict?.url && (
                        <div className={'w-full overflow-y-scroll overflow-x-hidden scrollbar-none'}>
                            <iframe
                                className="w-full h-[8000px] -mt-[50px]"
                                src={translation.webdict.url}
                                title="dict"
                            />
                        </div>
                    )}

                    <div className="sticky bottom-0 text-cyan-900 text-lg text-center w-full pt-1 mt-1 pb-2">
                        {translation.translation}
                    </div>
                </div>
            );
        };

        return (
            <>
                <div
                    ref={refs.setReference}
                    className={cn('rounded select-none z-50 focus:outline-none', hoverColor)}
                    role="button"
                    tabIndex={0}
                    {...getReferenceProps()}
                >
                    {word}
                </div>

                <div
                    {...getFloatingProps()}
                    ref={refs.setFloating}
                    style={floatingStyles}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="z-50" ref={ref}>
                        {popper()}
                    </div>
                </div>
            </>
        );
    }
);

export default WordPop;
