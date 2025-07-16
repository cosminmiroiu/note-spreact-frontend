import { type ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0,0,0,0.8)'
            }}>
                {children}
            </div>
        </div>
    );
};

export default PageWrapper;