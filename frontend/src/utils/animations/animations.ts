const animations = {
    dashboardSectionHeader: {
        from: {
            opacity: 0,
            filter: "blur(50px)",
            y: -10,
        },
        to: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1,
            ease: "power4.out",
        },
    },
    metricsCards: {
        from: {
            scale: 0,
            filter: "blur(50px)",
            y: 100,
            x: -50
        },
        to: {
            scale: 1,
            filter: "blur(0px)",
            y: 0,
            x: 0,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.5)",
        }
    },
    recentActivityCards: {
        from: {
            scale: 0.9,
            opacity: 0,
            y: 30,
            filter: 'blur(12px)',
        },
        to: {
            scale: 1,
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
        }
    },
    countUpEase: (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }
};
export {
    animations
}