<template>
    <svg 
        width="24" 
        height="24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        v-on="$listeners"
    >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M23 8.5C23 4.8 20.861 2 17.282 2 15.115 2 13.136 3.069 12 4.742 10.864 3.069 8.884 2 6.718 2 3.138 2 1 4.8 1 8.5c0 3.817 2.886 7.664 10.4 13.3l.6.45.6-.45C20.115 16.164 23 12.316 23 8.5zM17.282 4C19.622 4 21 5.805 21 8.5c0 2.93-2.398 6.211-9 11.246C5.398 14.712 3 11.43 3 8.5 3 5.805 4.379 4 6.718 4 9.03 4 11 5.743 11 8h2c0-2.257 1.969-4 4.282-4z" fill="currentColor"></path>
    </svg>
</template>

<script>
    export default {
        name: 'OzFavouriteIcon'
    }
</script>