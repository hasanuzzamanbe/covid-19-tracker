<template>
    <div id="all-country">
        <!-- main-content -->
        <section id="main-content">
            <section class="wrapper">
                <div class="row">
                    <div v-loading="loading" class="main-chart">
                        <!--CUSTOM CHART START -->
                        <div>
                            <h3>Historical data for {{country}}</h3>
                        </div>
                        <el-table
                            stripe
                            fit
                            fixed="left"
                            :data="arr"
                            style="width: 100%"
                        >
                            <el-table-column fixed label="Record date" prop="record_date"></el-table-column>
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
    name: "ByDate",
    data() {
        return {
            arr: [],
            country: "",
            loading: false,
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
