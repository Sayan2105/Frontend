import { Font, StyleSheet } from '@react-pdf/renderer';


Font.register({
    family: 'NotoSans',
    fonts: [
        {
            src: '/fonts/NotoSans-Regular.ttf', // Path to your font file
            fontWeight: 'normal',
        },
        {
            src: '/fonts/NotoSans-Bold.ttf',
            fontWeight: 'bold',
        },
        {
            src: '/fonts/NotoSans-Italic.ttf',
            fontStyle: 'italic',
        },
    ],
})



const styles = StyleSheet.create({
    // Page base styles
    page: {
        padding: '30px 20px',
        backgroundColor: '#fff',
        color: '#262626',
        fontFamily: 'NotoSans',
        fontSize: 11, // Numbers preferred over strings
    },

    // Spacing utilities
    spacing: {
        mt4: { marginTop: 16 },
        mb4: { marginBottom: 16 },
        ml2: { marginLeft: 8 },
        mr2: { marginRight: 8 },
        mxAuto: { marginHorizontal: 'auto' },
        p4: { padding: 16 },
        py2: { paddingVertical: 8 },
        px4: { paddingHorizontal: 16 },
    },

    test: {
        fontFamily: 'NotoSans-bold'
    },

    // Typography
    text: {
        italic: { fontStyle: 'italic' as any },
        xl: { fontSize: 24 },
        lg: { fontSize: 18 },
        base: { fontSize: 12 },
        sm: { fontSize: 10 },
        xs: { fontSize: 8 },
        lightGray: { color: '#6b7280' },
        muted: { color: '#9ca3af' },
        bold: { fontWeight: 'bold' },
        semibold: { fontWeight: 'bold' }, // Ensure font is registered
        underline: { textDecoration: 'underline' },
        uppercase: { textTransform: 'uppercase' },
    },

    // Layout
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center',
    },

    footer: {
        position: 'absolute',
        bottom: 30,
        left: 50,
        right: 50,
    },

    col6: { width: '50%' }, // Half width column

    // Special components
    divider: {
        height: 1,
        backgroundColor: '#e5e7eb',
    },

    borderedBox: {
        borderWidth: 1,
        // borderColor: '#d1d5db',
        // borderRadius: 4,
        padding: 7,
    },

    // Custom combinations
    receiptBox: {
        borderLeftWidth: 2,
        borderLeftColor: '#3b82f6',
        backgroundColor: '#f8fafc',
        padding: 12,
        marginVertical: 8,
    },

    // Alignment
    textCenter: { textAlign: 'center' },
    textRight: { textAlign: 'right' },
    itemsCenter: { alignItems: 'center' },
    itemsEnd: { alignItems: 'flex-end' },
    justifyBetween: { justifyContent: 'space-between' },
    justifyEnd: { justifyContent: 'flex-end' },

    // Advanced spacing
    spaceY: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8, // Better control with numbers
    },

    background: {
        backgroundColor: '#e5e7eb',
    },

    flex_1: {
        flex: 1
    },

    spacex16: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16, // Better control with numbers
    },

    w_full: {
        width: '100%'
    },

    display: {
        displayFlex: {
            display: 'flex'
        },
        none: {
            display: 'none'
        },
        block: {
            display: 'block'
        },
    },

    // Line height utilities
    leadingNone: { lineHeight: 1 },
    leadingTight: { lineHeight: 1.25 },
    leadingNormal: { lineHeight: 1.5 },


    flex_direction: {
        column: { flexDirection: "column" as any },
        row: { flexDirection: "row" as any },
    },


    // Special text treatments
    watermark: {
        color: '#f3f4f6',
        fontSize: 48,
        opacity: 0.3,
        position: 'absolute',
        zIndex: -1,
    },

    // Currency formatting
    currency: {
        fontFamily: 'Helvetica-Bold',
        color: '#059669', // Green for currency values
        textAlign: 'right',
    }
});







export default styles