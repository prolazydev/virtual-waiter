declare module 'vue' {
    export interface GlobalComponents {
        /**
         * Button - A reusable button component.
         * 
         * Usage:
         * ```vue
         * <Button type="submit" :disabled="true" color="blue">Click me</Button>
         * ```
         */
        Button: typeof import('./src/components/ui/MyButton.vue')['default']
    }
}