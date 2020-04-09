<template>
    <div id="all-country">
        <!-- main-content -->
        <section id="main-content">
            <section class="wrapper">
                <div class="row all-data-row-wrapper">
                    <div v-if="!loading" class="main-chart">
                        <el-row>
                            <el-col :sm="12" :md="12">
                                <div>
                                    <h3 class="fantasy">Historical data for {{country}}</h3>
                                </div>
                            </el-col>
                            <el-col class="info-response" :sm="12" :md="12">
                                <span class="info-title">Total data:</span><span class="info-value">{{arr.length}}</span><br/>
                                 <span class="info-title">Country:</span> <span class="info-value">{{country}}</span><br/>
                                 <span v-if="arr.length !== 0"><span class="info-title">Last record:</span><span class="info-value"> {{ arr[0]['record_date'] }}</span></span>
                            </el-col>
                        </el-row>
                        <!--CUSTOM CHART START -->
                        <el-table stripe fit fixed="left" :data="arr" style="width: 100%">
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
                    <div v-else>
                        <img
                            style="border: 1px solid #4ecdc4; border-radius: 91px;"
                            src="../assets/loadinghand.png"
                            alt="Loading.."
                        />
                        <h4>Wait, first wash your hands...</h4>
                        <br />
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
    name: "getYourCountry",
    data() {
        return {
            arr: [],
            country: null,
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
        },
        getIpLocation() {
            if(window.myCountry) {
                this.getCasesByCountry(window.myCountry)
            }else {
                fetch("https://api.ipgeolocation.io/ipgeo?apiKey=b8ee58e19922458ba3fe3081e146103f")
                .then(res => res.json())
                .then(response => {
                    if (response.country_name && response.country_name !== "") {
                        this.country = response.country_name;
                    } else {
                        this.country = "Bangladesh";
                    }
                    this.getCasesByCountry(this.country);
                })
                .catch((data, status) => {
                    this.getCasesByCountry('Bangladesh');
                    console.log("Request failed", data, status);
                });
            }
            
        }
    },
    mounted() {
        this.getIpLocation();
    }
};
</script>
