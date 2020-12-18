<template>
    <div class="player">
        <!-- <audio :src="audioSrc" controls autoplay /> -->
        <audio ref="musicAudio" controls/>
    </div>
</template>

<script>
import bus from "@/utils/bus.js";

export default {
    mounted() {
        let audioElem = this.$refs.musicAudio

        bus.$on("playmusic", async (data) => {
            const res = await this.$axios.get("song/url", {
                params: {
                    id: data,
                },
            });
            // this.audioSrc = res.data[0].url;
            
            audioElem.src = res.data[0].url;
            audioElem.play();
           
        });

        bus.$on("pausemusic", () => {
            audioElem.pause();
        })
    },
};
</script>

<style lang="less" scoped>
.player {
    background: #f1f3f4;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
audio {
    width: 100%;
    border-radius: none;
    outline: none;
}
</style>