import styles from '@/components/OzContainer/style.module.css';

export default {
    functional: true,
    name: 'OzContainer',
    render(createElement, {children}) {
        return createElement(
            'div',
            {
                class: styles.ozContainer,
            },
            children
        )
    }
}