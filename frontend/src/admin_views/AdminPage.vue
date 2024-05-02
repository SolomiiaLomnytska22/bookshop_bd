<template>
    <div class="admin" @click="show_menu = false">
        <div class="side-menu" @click.stop="" v-if="show_menu">
            <div class="menu-item" @click="$router.push('/books')">Books</div>
            <div class="menu-item" @click="$router.push('/storage')">Storage</div>
            <div class="menu-item">Authors</div>
            <div class="menu-item">Genres</div>
        </div>
        <div class="handle" v-else @click="show_menu = true" @click.stop="">
            <div class="arrow"></div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return{
            show_menu: true
        }
    }
}
</script>

<style>
.side-menu {
    position: fixed;
    left: 0;
    top: 0;
    width: 20%;
    height: 100%;
    background-color: #1e1e1ee1;
    padding-top: 150px;
    color: #fff;
}

.menu-item {
    padding: 10px 20px;
    padding-left: 50px;
    cursor: pointer;
}

.menu-item:hover {
    background-color: #3f1f1fcc;
}

.handle {
    position: fixed;
    left: 0;
    top: 0;
    width: 20px;
    background-color: #1e1e1e;
    height: 100%;
}

.arrow {
    position: absolute;
    top: calc(50% + 60px);
    left: 30%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-top: 2px solid #fff;
    border-right: 2px solid #fff;
    transform: rotate(45deg); /* Rotate the arrow to point to the other side */
    margin-top: -5px;
    margin-left: -5px;
    cursor: pointer;
}
</style>