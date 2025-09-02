import { ReactNode, useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    // Handle ESC key press and body scroll
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset'; // Restore scroll
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"} overflow-y-auto`}
        >
            <div className="flex items-center justify-center min-h-screen p-4">
                {/* Enhanced backdrop */}
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
                    onClick={handleOverlayClick}
                    aria-hidden="true"
                />

                {/* Modal container with improved styling */}
                <div className="relative z-10 w-full max-w-sm mx-auto">
                    <div className="animate-in fade-in-0 zoom-in-95 duration-300">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
