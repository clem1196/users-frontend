<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" hidden id="unauthorized" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#unauthorizedModal">
            Launch demo modal
        </button>

        <!-- Modal -->
        <div class="modal fade" id="unauthorizedModal" tabindex="-1" aria-labelledby="unauthorizedModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title fs-5" id="unauthorizedModalLabel">{{ title }}</h5>
                        <button @click="props.closeFormUnauthorized?.call" type="button" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        Usted no tiene autorización
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-light btn-sm" @click="props.closeFormUnauthorized?.call"
                            data-bs-dismiss="modal">Regresar</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { _role, _user } from '../../interface/userInterface';
//props
const props = defineProps({
    title: { type: String, default: 'Error' },
    closeFormUnauthorized: { type: Function }
})
onMounted(async () => {
    doClick()
})
const doClick = () => {
    const unauthorized: HTMLElement | null = document.getElementById('unauthorized')
    if (unauthorized !== null) {
        unauthorized.click()
    }
}


</script>

<style scoped></style>