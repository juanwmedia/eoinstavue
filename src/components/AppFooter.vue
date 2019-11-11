<template>
    <section class="section">
        <div class="container has-text-centered">
            <a href="#">
                <i class="fas fa-camera"></i>
            </a>
        </div>
    </section>
</template>

<script>
export default {
    name: 'AppFooter',
}
</script>

<style lang="scss" scoped>
    section {
        padding: 1rem;
        flex-basis: 80px;
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: white;
    }
    
    i {
        font-size: 50px;
    }    
</style>