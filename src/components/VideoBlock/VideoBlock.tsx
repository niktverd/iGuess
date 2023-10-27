import React, {useState} from 'react';

import s from './VideoBlock.module.css';

type VideoBlockProps = {
    title: string;
    subtitle: string;
    // text: string;
    // onClick: () => void;
};

export const VideoBlock = ({title, subtitle}: VideoBlockProps) => {
    const [progress, setProgress] = useState(0);
    const trigger = progress < 10 || progress > 70;
    const styles = {
        filter: trigger ? 'blur(16px)' : undefined,
    };
    return (
        <div className={s.container}>
            <div className={s['video-container']}>
                <video
                    className={s.video}
                    src="./first-screen.mp4"
                    style={styles}
                    muted={true}
                    autoPlay
                    loop
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onTimeUpdate={(e: any) =>
                        setProgress((e.target.currentTime / e.target.duration) * 100)
                    }
                />
            </div>
            <div className={`s.content ${trigger ? s['big-content'] : s['small-content']}`}>
                <h1 className={trigger ? s['big-title'] : s['small-title']}>{title}</h1>
                <p className={trigger ? s['big-subtitle'] : s['small-subtitle']}>{subtitle}</p>
            </div>
        </div>
    );
};
