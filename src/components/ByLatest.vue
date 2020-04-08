<template>
    <div id="all-country">
        <!-- main-content -->
        <section id="main-content">
            <section class="wrapper">
                <div class="row">
                    <div v-loading="loading" class="main-container">
                        <!--CUSTOM CHART START -->
                        <div>
                            <h3>Latest Information of {{country}}</h3>
                        </div>
                        <el-table stripe fit fixed="left" :data="arr" style="width: 100%">
                            <el-table-column label="Record date" prop="record_date"></el-table-column>
                            <el-table-column label="Total cases" prop="total_cases"></el-table-column>
                            <el-table-column label="New cases" prop="new_cases"></el-table-column>
                            <el-table-column label="Active cases" prop="active_cases"></el-table-column>
                            <el-table-column label="total_deaths" prop="total_deaths"></el-table-column>
                            <el-table-column label="New deaths" prop="new_deaths"></el-table-column>
                            <el-table-column label="Total recovered" prop="total_recovered"></el-table-column>
                            <el-table-column label="Cases per 1m" prop="total_cases_per1m"></el-table-column>
                            <el-table-column
                                label="cases 1m/population"
                                prop="total_cases_per_1m_population"
                            ></el-table-column>
                        </el-table>
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
    name: "ByLatest",
    data() {
        return {
            arr: [],
            country: "",
            urlImage: "",
            tips: false,
            loading: false,
            api: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/",
            headers: {
                "X-RapidAPI-Key":
                    "d5a7a67247msh00ac5e296fd8222p1fea22jsnf4c137fa39f5",
                "X-RapidAPI-Host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-version": "1.1.0",
                "transfer-encoding": "chunked",
                vary: "Accept-Encoding",
                connection: "Close"
            }
        };
    },
    methods: {
        getLAtestByCountry(country) {
            this.makeRequest("latest_stat_by_country.php?country=" + country);
        },
        makeRequest(path) {
            this.loading = true;
            let api = this.api + path;
            fetch(api, {
                method: "get",
                headers: this.headers
            })
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    this.arr = json.latest_stat_by_country;
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
        this.getLAtestByCountry(this.$route.params.country);
    }
};
</script>
<style scoped>
</style>
