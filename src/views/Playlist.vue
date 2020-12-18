<template>
    <div class="playlist-container">
        <div class="top-wrap">
            <div class="img-wrap">
                <img :src="playlist.coverImgUrl" alt="" />
            </div>
            <div class="info-wrap">
                <p class="title">{{ playlist.name }}</p>
                <div class="author-wrap" v-if="playlist.creator">
                    <img
                        :src="playlist.creator.avatarUrl"
                        alt=""
                        class="avatar"
                    />
                    <span class="name">{{ playlist.creator.nickname }}</span>
                    <span class="time">
                        {{ playlist.createTime | formatDate }}
                    </span>
                </div>
                <div class="tag-wrap">
                    <span class="title">标签：</span>
                    <ul>
                        <li v-for="item in playlist.tags" :key="item">
                            {{ item }}
                        </li>
                    </ul>
                </div>
                <div class="desc-wrap">
                    <span class="title">简介：</span>
                    <span class="desc">{{ playlist.description }}</span>
                </div>
            </div>
        </div>
        <div class="content-wrap">
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
                    <tr v-for="(item, index) in playlist.tracks" :key="item.id">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <div class="img-wrap" @click="playMusic(item.id)">
                                <img :src="item.al.picUrl" alt />
                                <span class="iconfont icon-play"></span>
                            </div>
                        </td>
                        <td>
                            <div class="song-wrap">
                                <div class="name-wrap">
                                    <span>{{ item.name }}</span>
                                    <!-- mv图标 -->
                                    <span
                                        v-if="item.mv"
                                        @click="toMV(item.mv)"
                                        class="iconfont icon-mv"
                                    ></span>
                                </div>
                            </div>
                        </td>
                        <td>{{ item.ar[0].name }}</td>
                        <td>{{ item.al.name }}</td>
                        <td>{{ item.dt | formatDuration }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import bus from '@/utils/bus.js'

export default {
    data() {
        return {
            id: "",
            playlist: {}
        };
    },
    mounted() {
        this.id = this.$route.query.id;
        this.getPlaylistData();
    },
    methods: {
        async getPlaylistData() {
            const res = await this.$axios.get("playlist/detail", {
                params: {
                    id: this.$route.query.id,
                },
            });

            this.playlist = res.playlist;
        },
        playMusic(id) {
            bus.$emit('playmusic', id)
        },
        toMV(id) {
            this.$router.push(`/mv/${id}`)
        }
    },
};
</script>

<style lang="less">
.playlist-container {
    margin: auto;
    padding-top: 40px;
    .top-wrap {
        display: flex;
        color: gray;
        span {
            font-size: 17px;
        }
        .img-wrap {
            margin-right: 30px;
            img {
                width: 230px;
                height: 230px;
            }
        }
        .info-wrap {
            .title {
                margin-bottom: 20px;
            }
            .author-wrap {
                display: flex;
                align-items: center;
                margin-bottom: 25px;
                img {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                .name {
                    margin-right: 10px;
                }
                .time {
                    font-size: 14px;
                }
            }
            .play-wrap {
                width: 120px;
                height: 35px;
                border-radius: 4px;
                background: linear-gradient(to right, #e85e4d, #c6483c);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 25px;
                span {
                    color: white;
                    &.iconfont {
                        margin-right: 8px;
                    }
                    &.text {
                        font-size: 16px;
                    }
                }
            }
            .tag-wrap {
                display: flex;
                margin-bottom: 15px;
                span {
                    margin: 0;
                }
                ul {
                    display: flex;
                    align-items: center;
                }
                li {
                    font-size: 15px;
                    &:not(:last-child)::after {
                        content: "/";
                        margin: 0 4px;
                    }
                }
            }
            .desc-wrap {
                span {
                    &:last-child {
                        font-size: 15px;
                    }
                }
            }
            span:first-child {
                margin-right: 10px;
            }
        }
    }
    .content-wrap {
        margin-top: 10px;
        border-top: 1px solid #f0f0f0;
    }
}
</style>