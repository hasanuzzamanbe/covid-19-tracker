<template>
    <div id="all-country">
        <!-- main-content -->
        <section id="main-content">
            <section class="wrapper">
                <div class="row all-data-row-wrapper">
                    <div v-if="!loading" class="main-chart" style="padding:25px;">
                        <div class="by-date-lg-table">
                            <div>
                                <h3 class="fantasy">Historical data for {{country}}</h3>
                            </div>
                            <el-table
                                class="case-all-table"
                                stripe
                                height="615"
                                sortable
                                fit
                                fixed="left"
                                :data="arr"
                                style="width: 100%"
                            >
                                <el-table-column fixed label="Record date" prop="record_date"></el-table-column>
                                <el-table-column sortable label="Total cases" prop="total_cases"></el-table-column>
                                <el-table-column sortable label="New cases" prop="new_cases"></el-table-column>
                                <el-table-column sortable label="Active cases" prop="active_cases"></el-table-column>
                                <el-table-column sortable label="total_deaths" prop="total_deaths"></el-table-column>
                                <el-table-column sortable label="New deaths" prop="new_deaths"></el-table-column>
                                <el-table-column
                                    sortable
                                    label="Total recovered"
                                    prop="total_recovered"
                                ></el-table-column>
                                <el-table-column
                                    sortable
                                    label="Cases per 1M"
                                    prop="total_cases_per1m"
                                ></el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div v-else>
                        <img class="loader-img"
                            src="../assets/loadinghand.png"
                            alt="Loading.."
                        />
                        <h4 style="text-align: center;">Wait, first wash your hand...</h4>
                        <br />
                        <img class="loader-img-2" src="../assets/ajax-loader.gif" />
                    </div>
                </div>
                <!-- /row -->
            </section>
        </section>
        <!--main content end-->
    </div>
</template>

<script>
/* eslint-disabled */
export default {
    name: "ByDate",
    data() {
        return {
            arr: [],
            country: "",
            loading: true,
            api: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/"
        };
    },
    methods: {
        getCasesByCountry(country) {
            this.makeRequest(
                "cases_by_particular_country.php?country=" + country
            );
        },
        makeRequest(path) {
            this.loading = true;
            var headers = {
                "X-RapidAPI-Key":
                    "d5a7a67247msh00ac5e296fd8222p1fea22jsnf4c137fa39f5",
                "X-RapidAPI-Host": "coronavirus-monitor.p.rapidapi.com",
                "content-type": "text/html; charset=UTF-8"
            };
            let api = this.api + path;
            fetch(api, {
                method: "get",
                headers: headers
            })
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    this.arr = json.stat_by_country.reverse();
                    this.country = json.country;
                    this.loading = false;
                })
                .catch(function(error) {
                    this.loading = false;
                    console.log("Request failed", error);
                });
        }
    },
    mounted() {
        this.getCasesByCountry(this.$route.params.country);
    }
};
</script>
