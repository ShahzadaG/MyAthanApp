import { config } from '@/theme/_config';
export const generateFontColors = (configuration) => {
    return Object.entries(configuration.fonts.colors ?? {}).reduce((acc, [key, value]) => {
        return Object.assign(acc, {
            [`${key}`]: {
                color: value,
            },
        });
    }, {});
};
export const generateFontSizes = () => {
    return config.fonts.sizes.reduce((acc, size) => {
        return Object.assign(acc, {
            [`size_${size}`]: {
                fontSize: size,
            },
        });
    }, {});
};
export const staticFontStyles = {
    baseFont: {
        color: '#999',
        fontFamily: 'Poppins',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    bold: {
        fontWeight: 'bold',
    },
    uppercase: {
        textTransform: 'uppercase',
    },
    capitalize: {
        textTransform: 'capitalize',
    },
    alignCenter: {
        textAlign: 'center',
    },
    upcomingPrayerText: {
        color: '#999',
        fontFamily: 'Poppins',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '500',
      },
      upcomingPrayerTextInfo: {
        color: '#6849FF',
        fontFamily: 'Poppins',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '600',
      },
};
