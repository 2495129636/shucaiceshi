<template>
    <div>
        <nav-header @btnClick="backBtn" :backShow="true" title="咨询详情"></nav-header>
        <div class="content">

            <div class="Ctitle">
                {{newsinfo.title}}
            </div>
            <div class="from">
                <span>来源：人民日报</span>
                <span>{{newsinfo.time1}}</span>
            </div>

            <!-- <div class="img">
                <img :src="newinfo.img" alt="">
            </div> -->

            <div class="Ccontent">
                <!-- {{}} -->

                <div v-html="newsinfo.details">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navHeader from "@/components/header";
    export default {
        data() {
            return {
                newsinfo: ''
            }
        },
        components: {
            navHeader
        },
        methods: {
            backBtn() {
                this.$router.go(-1)
            },
            async getNewInfo() {
                let getNewInfo = await this.service.home.infomdetail({
                    id: this.$route.query.id
                })
                console.log(getNewInfo)
                this.newsinfo = getNewInfo.data
            }
        },
        created() {
            this.getNewInfo()
        },
    }
</script>

<style scoped="scoped" lang="scss">
    .content {
        background-color: #FFFFFF;
        width: 100%;
        margin-top: 46px;
        border-top: 10px solid #F6F6F6;

        .Ctitle {
            width: 345px;
            margin: 20px auto;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(30, 30, 30, 1);

        }

        .from {
            width: 345px;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            span {
                font-size: 15px;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);

                &:last-child {
                    font-size: 12px;
                }
            }

        }

        .img {
            width: 345px;

            margin: 20px auto;
        }

        .Ccontent {
            margin: 0 auto;
            width: 345px;
        }

    }
</style>