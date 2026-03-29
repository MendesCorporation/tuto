interface Props {
    currentIndex: number;
    total: number;
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
    onNext: () => void;
    onPrev: () => void;
    onSeek: (index: number) => void;
}
export default function PlayerControls({ currentIndex, total, isPlaying, onPlay, onPause, onNext, onPrev, onSeek }: Props): import("react/jsx-runtime").JSX.Element;
export {};
