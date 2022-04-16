<script lang="tsx">

import { SimpleMenu } from '@/components/SimpleMenu';
import { BasicMenu } from '@/components/Menu';

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
