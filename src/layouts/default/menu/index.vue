<script lang="tsx">

import { SimpleMenu } from '@/components/SimpleMenu';

export default defineComponent({
    setup() {
        function renderMenu() {
            return (
                <SimpleMenu />
            )
        }

        return () => (
            <>
                {renderMenu()}
            </>
        )
    }
})
</script>
