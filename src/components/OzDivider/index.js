export default {
    functional: true,
    name: 'OzDivider',
    props: {
        vertical: {
            type: Boolean,
            default: false
        }
    },
    render(createElement, { props }) {
        const orientation = props.vertical ? 'vertical' : 'horizontal';

        return createElement(
            'hr',
            {
                class: 'ozDivider',
                attrs: {
                    role: 'separator',
                    'aria-orientation': orientation
                }
            }
        )
    }
}