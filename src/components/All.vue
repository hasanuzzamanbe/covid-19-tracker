<template>
    <div id="all-country">
        <!-- main-content -->
        <section id="main-content">
            <section class="wrapper">
                <div class="row">
                    <div class="all-data-row-wrapper" v-if="!loading">
                        <!--CUSTOM CHART START -->
                        <el-header>
                            <el-col :span="12">
                                <div>
                                    <h3 class="fantasy">All Affected Countries</h3>
                                </div>
                            </el-col>
                            <el-row>
                                <el-col :sm="12" :md="12">
                                    <el-input
                                        v-model="search"
                                        size="medium"
                                        placeholder="Type country name to search"
                                    >
                                        <el-button slot="append" icon="el-icon-search"></el-button>
                                    </el-input>
                                </el-col>
                            </el-row>
                        </el-header>

                        <el-table
                            stripe
                            height="900"
                            fixed="left"
                            :data="arr.filter(item => !search || item.country_name.toLowerCase().includes(search.toLowerCase()))"
                            style="width: 100%"
                        >
                            <el-table-column label="Country" prop="country_name"></el-table-column>
                            <el-table-column sortable label="Cases" prop="cases"></el-table-column>
                            <el-table-column sortable label="Total Recovered" prop="total_recovered"></el-table-column>
                            <el-table-column sortable label="Active cases" prop="active_cases"></el-table-column>
                            <el-table-column sortable label="Deaths" prop="deaths"></el-table-column>
                            <el-table-column sortable label="New Deaths" prop="new_deaths"></el-table-column>
                            <el-table-column sortable label="New Cases" prop="new_cases"></el-table-column>
                            <el-table-column  label="Serious critical" prop="serious_critical"></el-table-column>
                            <el-table-column
                                label="cases 1m/population"
                                prop="total_cases_per_1m_population"
                            ></el-table-column>
                            <el-table-column align="right" fixed="right">
                                <!-- eslint-disable-next-line -->
                                <template slot="header" slot-scope="scope">
                                    <el-input
                                        v-model="search"
                                        size="mini"
                                        placeholder="Type to search"
                                    />
                                </template>
                                <template slot-scope="scope">
                                    <el-button-group>
                                        <el-button
                                            size="mini"
                                            icon="el-icon-view"
                                            @click="getlatestByCountry(scope.row.country_name)"
                                        ></el-button>
                                        <el-button
                                            size="mini"
                                            icon="el-icon-monitor"
                                            @click="getCasesByCountry(scope.row.country_name)"
                                        ></el-button>
                                    </el-button-group>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-else>
                        <img src="../assets/ajax-loader.gif" />
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
    name: "AllCountry",
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
            this.$router.push({
                name: "ByLatest",
                params: { country: country }
            });
        },
        getAllCountry() {
            this.makeRequest("cases_by_country.php");
        },
        getCasesByCountry(country) {
            this.$router.push({
                name: "ByDate",
                params: { country: country }
            });
        },

        makeRequest(path) {
            this.loading = true;
            var headers = {
                "X-RapidAPI-Key":
                    "d5a7a67247msh00ac5e296fd8222p1fea22jsnf4c137fa39f5",
                "X-RapidAPI-Host": "coronavirus-monitor.p.rapidapi.com",
                "content-type": "text/html; charset=UTF-8",
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
                    this.arr = json.countries_stat.filter(data => {
                        return data.country_name !== "";
                    });
                    // console.log(this.arr)
                    this.loading = false;
                })
                .catch(function(error) {
                    this.loading = false;
                    console.log("Request failed", error);
                });
        }
    },
    mounted() {
        this.getAllCountry();
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
