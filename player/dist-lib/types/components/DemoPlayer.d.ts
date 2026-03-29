import { Recording } from '../types';
export interface DemoPlayerProps {
    data: Recording;
    /** Fill the parent container (default). Set explicit px/% values to constrain. */
    width?: string | number;
    height?: string | number;
    /** Start playing automatically */
    autoPlay?: boolean;
    /** Called when the last step finishes in autoplay */
    onComplete?: () => void;
}
export default function DemoPlayer({ data, width, height, autoPlay, onComplete, }: DemoPlayerProps): import("react/jsx-runtime").JSX.Element | null;
