<template>
    <div id="all-country">
        <!-- main-content -->
        <section id="main-content">
            <section class="wrapper">
                <div class="row all-data-row-wrapper">
                    <div v-loading="loading" class="main-container">
                        <!--CUSTOM CHART START -->
                        <div>
                            <h3 class="fantasy">Latest Information of {{country}}</h3>
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
                <div class="border-shadow">
                    <h4 class="fantasy goleft">
                        <i class="el-icon-location-outline"></i>
                        Coronavirus Cases-
                        {{specCountry.country_name}}
                    </h4>

                    <!-- <div class=""> -->

                    <table class="case-own">
                        <tr>
                            <th>CONFIRMED</th>
                            <th>RECOVERED</th>
                            <th>DEATHS</th>
                        </tr>
                        <tr>
                            <td>{{specCountry.total_cases}}</td>
                            <td>{{specCountry.total_recovered}}</td>
                            <td>{{specCountry.total_deaths}}</td>
                        </tr>
                    </table>
                    <div class style="width:90%;">
                        <p
                            class="goleft"
                            style="font-size: 11px;margin-top: 13px;padding-left: 15px;"
                        >
                            The ratio of
                            <span
                                style="color:blue;"
                            >Recovery ({{recoveryOwn.recPercent}}%) and Deaths ({{recoveryOwn.deathPercent}}%)</span>
                            in {{specCountry.country_name}}
                        </p>
                    </div>
                    <table class="case-own-2">
                        <tr>
                            <th>
                                Currently infected
                                <br />patients
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <strong
                                    style="color: #d12e2e;font-size: 23px;"
                                >{{specCountry.active_cases}}</strong>
                            </td>
                            <td>
                                <ul class="ul-with-bullet goleft">
                                    <li class="fstli">
                                        New Cases
                                        <span
                                            style="margin-left:22px;font-weight:bold;"
                                        >{{specCountry.new_cases}}</span>
                                    </li>
                                    <li class="ndli">
                                        New Deaths
                                        <span
                                            style="margin-left:22px;font-weight:bold;"
                                        >{{specCountry.new_deaths}}</span>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </table>
                </div>
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
            specCountry: {},
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
    computed: {
        recoveryOwn() {
            if (Object.values(this.specCountry).length !== 0) {
                let all = parseFloat(this.specCountry.total_cases.replace(/,/g, ""));
                let rec = parseFloat(
                    this.specCountry.total_recovered.replace(/,/g, "")
                );
                let deaths = parseFloat(
                    this.specCountry.total_deaths.replace(/,/g, "")
                );
                let recPercent = ((rec / all) * 100).toFixed(2);
                let deathPercent = ((deaths / all) * 100).toFixed(2);
                return { recPercent, deathPercent };
            } else {
                return "";
            }
        }
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
                    this.specCountry = json.latest_stat_by_country[0];
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
