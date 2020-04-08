<template>
    <div id="all-country">
        <!-- main-content -->
        <section id="main-content">
            <section class="wrapper">
                <div class="row">
                    <div v-loading="loading" class="main-chart">
                        <!--CUSTOM CHART START -->
                        <div>
                            <h3>All Affected Countries</h3>
                        </div>
                        <!-- <el-button @click="getAllCountry">get all country</el-button> -->
                        <!-- <button @click="getlatestByCountry">latest by country</button> -->
                        <!-- <button @click="getCasesByCountry">latest by country</button> -->
                        <el-table
                            stripe
                            fit
                            fixed="left"
                            :data="arr.filter(item => !search || item.country_name.toLowerCase().includes(search.toLowerCase()))"
                            style="width: 100%"
                        >
                            <el-table-column label="Country name" prop="country_name"></el-table-column>
                            <el-table-column label="Cases" prop="cases"></el-table-column>
                            <el-table-column label="Total Recovered" prop="total_recovered"></el-table-column>
                            <el-table-column label="Cases" prop="cases"></el-table-column>
                            <el-table-column label="New Deaths" prop="new_deaths"></el-table-column>
                            <el-table-column label="New Cases" prop="new_cases"></el-table-column>
                            <el-table-column label="Serious critical" prop="serious_critical"></el-table-column>
                            <el-table-column label="New Cases" prop="new_cases"></el-table-column>
                            <el-table-column label="Active cases" prop="active_cases"></el-table-column>
                            <el-table-column
                                label="cases 1m/population"
                                prop="total_cases_per_1m_population"
                            ></el-table-column>
                            <el-table-column align="right">
                                <!-- eslint-disable-next-line -->
                                <template slot="header" slot-scope="scope">
                                    <el-input
                                        v-model="search"
                                        size="mini"
                                        placeholder="Type to search"
                                    />
                                </template>
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        @click="getCasesByCountry(scope.row.country_name)"
                                    >Details</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- <el-dialog width="270px" :visible.sync="loading">
                        <img src="../assets/loading.png" />
                    </el-dialog> -->
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
            search: "",
            loading: false,
            api: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/"
        };
    },
    methods: {
        getlatestByCountry(country) {
            let path = "latest_stat_by_country.php?country=" + country;
            this.makeRequest(path);
        },
        getAllCountry() {
            this.makeRequest("cases_by_country.php");
        },
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
                "content-type": "text/html; charset=UTF-8",
                "x-rapidapi-region": "AWS - ap-southeast-1",
                "x-rapidapi-version": "1.1.0",
                "transfer-encoding": "chunked",
                date: "Tue, 07 Apr 2020 07:12:18 GMT",
                server: "RapidAPI-1.1.0",
                vary: "Accept-Encoding",
                connection: "Close"
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
                    if (json.countries_stat) {
                        this.arr = json.countries_stat;
                    } else if (json.latest_stat_by_country) {
                        this.arr = json.latest_stat_by_country;
                    } else {
                        this.arr = json.stat_by_country;
                    }
                    this.loading = false;
                })
                .catch(function(error) {
                    this.loading = false;
                    console.log("Request failed", error);
                });
        }
    },
    mounted() {
        // this.getCasesByCountry();
        this.$routes.param()
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
