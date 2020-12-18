<template>
    <div class="songs-container">
        <div class="tab-bar">
            <span 
                v-for="(value, name) in types"
                :key="name"
                class="item" 
                :class="{ active: type == value }" 
                @click="type = value"
            >
                {{name}}
            </span>
        </div>
        <!-- 底部的table -->
        <table class="el-table playlit-table">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>音乐标题</th>
                    <th>歌手</th>
                    <th>专辑</th>
                    <th>时长</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in songList" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <div class="img-wrap" @click="playMusic(item.id)">
                            <img :src="item.album.picUrl" alt />
                            <span class="iconfont icon-play"></span>
                        </div>
                    </td>
                    <td>
                        <div class="song-wrap">
                            <div class="name-wrap">
                                <span>{{ item.name }}</span>
                                <span
                                    v-if="item.mvid != 0"
                                    class="iconfont icon-mv"
                                    @click="toMV(item.mvid)"
                                ></span>
                            </div>
                        </div>
                    </td>
                    <td>{{ item.artists[0].name }}</td>
                    <td>{{ item.album.name }}</td>
                    <td>{{ item.duration | formatDuration }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import bus from '@/utils/bus.js'

export default {
    data() {
        return {
            type: 0,
            types: {
                '全部': 0,
                '华语': 7,
                '欧美': 96,
                '日本': 8,
                '韩国': 16
            },
            songList: []
        }
    },
    mounted() {
        this.getSongListData();
    },
    methods: {
        async getSongListData() {
            const res = await this.$axios.get('top/song', {
                query: {
                    type: this.type
                }
            });

            this.songList = res.data;
        },
        playMusic(id) {
            bus.$emit('playmusic', id)
        },
        toMV(id) {
            this.$router.push(`/mv/${id}`)
        }
    },
    watch: {
        type() {
            this.getSongListData()
        }
    }
};
</script>

<style lang="less">
.songs-container {
    .tab-bar {
        display: flex;
        justify-content: flex-end;
        .item {
            font-size: 15px;
            color: gray;
            margin-right: 20px;
            cursor: pointer;
            &.active {
                color: #dd6d60;
            }
        }
    }
    .song-table {
        .song-wrap {
            > span {
                margin-top: 20px;
                display: inline-block;
                color: #bebebe;
            }
            .icon-mv {
                padding-left: 5px;
                color: #dd6d60;
            }
        }
        .img-wrap {
            position: relative;
            width: 70px;
            height: 70px;
            img {
                width: 70px;
                height: 70px;
                border-radius: 5px;
            }
            .icon-play {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 25px;
                height: 25px;
                color: #dd6d60;
                font-size: 12px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(255, 255, 255, 0.8);
                &::before {
                    transform: translateX(1px);
                }
            }
        }
    }
}
</style>