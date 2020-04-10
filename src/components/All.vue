<template>
    <div id="all-country">
        <!-- main-content -->
        <section id="main-content">
            <section class="wrapper">
                <div class="row">
                    <div class="all-data-row-wrapper" v-if="!loading">

                <el-row class="first-row" >
                    <el-col :sm="12" :md="10" :lg="8" class="first-row-left-col">
                         <div class="border-shadow">
                            <h4 class="fantasy goleft">
                                <i class="el-icon-document"></i> 
                                 Coronavirus Cases-Worldwide</h4>
                            <p class="goleft">TOTAL CONFIRMED CASES</p>
                         
                            <h3 class="goleft">{{worldCases.total_cases}}</h3>
                            <hr/>
                            <div class="" style="width:90%;">
                                <span class="goleft">Recovery rate</span>   
                                <el-progress :percentage="getPercent" :format="format"></el-progress>
                            </div>
                            
                            <div class="block-cases">
                                <div class="grid">
                                    <p><i class="color-green el-icon-s-home"></i> Total Recovered</p>
                                    <p>{{worldCases.total_recovered}}</p>
                                </div>
                                 <div class="grid">
                                    <p><i class="color-red el-icon-warning"></i> Total Deaths</p>
                                    <p>{{worldCases.total_deaths}}</p>
                                </div>
                                 <div class="grid">
                                    <p><i class="color-yellow el-icon-top"></i> Total New</p>
                                    <p>{{worldCases.new_cases}}</p>
                                </div>
                            </div>     
                        </div>
                          <div class="border-shadow">
                            <h4 class="fantasy goleft">
                                <i class="el-icon-location-outline"></i> 
                                Coronavirus Cases-Bangladesh
                            </h4>
                            <p class="goleft">TOTAL CONFIRMED CASES</p>
                         
                            <h3 class="goleft">{{worldCases.total_cases}}</h3>
                            <hr/>
                            <div class="" style="width:90%;">
                                <span class="goleft">Recovery rate</span>   
                                <el-progress :percentage="getPercent" :format="format"></el-progress>
                            </div>
                            
                            <!-- <div class=""> -->

                                <table class="case-own">
                                    <tr>
                                        <th>CONFIRMED</th>
                                        <th>RECOVERED</th>
                                        <th>DEATHS</th>
                                    </tr>
                                    <tr>
                                        <td>{{worldCases.new_cases}}</td>
                                        <td>{{worldCases.total_recovered}}</td>
                                        <td>{{worldCases.total_deaths}}</td>
                                    </tr>
                                </table>
                                <el-row>
                                    <el-col>
                                        
                                        
                                    </el-col>
                                    <el-col>
                                        
                                        
                                    </el-col>
                                    <el-col>
                                        
                                        
                                    </el-col>
                                </el-row>
                                
                        </div>
                    </el-col>

                    <el-col :sm="12" :md="14" :lg="16" class="border-shadow-right first-row-right-col">
                        <div>
                            <h3 class="fantasy">Cases By Country</h3>
                        </div>
                        <el-input
                            v-model="search"
                                size="medium"
                                placeholder="Type country name to search">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                        <el-table
                            stripe
                            height="535"
                            :data="arr.filter(item => !search || item.country_name.toLowerCase().includes(search.toLowerCase()))"
                            style="width: 100%"
                        >
                            <el-table-column label="Country" prop="country_name"></el-table-column>
                            <el-table-column sortable label="Cases" prop="cases"></el-table-column>
                            <el-table-column sortable label="Recovered" prop="total_recovered"></el-table-column>
                            <el-table-column align="right" width="108">
                                <!-- eslint-disable-next-line -->
                                <template slot-scope="scope" label="Details">
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
                    </el-col>
                </el-row>

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
            arr: [{country_name: "Canada", cases: "20,765", deaths: "509", region: "", total_recovered: "5,311"},{country_name: "Brazil", cases: "18,176", deaths: "957", region: "", total_recovered: "173"},{country_name: "Portugal", cases: "13,956", deaths: "409", region: "", total_recovered: "205"},{country_name: "Austria", cases: "13,337", deaths: "295", region: "", total_recovered: "5,240"},{country_name: "Russia", cases: "11,917", deaths: "94", region: "", total_recovered: "795"},{country_name: "S. Korea", cases: "10,450", deaths: "208", region: "", total_recovered: "7,117"},{country_name: "Israel", cases: "9,968", deaths: "86", region: "", total_recovered: "1,011"},{country_name: "Sweden", cases: "9,141", deaths: "793", region: "", total_recovered: "205"},{country_name: "India", cases: "6,771", deaths: "228", region: "", total_recovered: "635"},{country_name: "Ireland", cases: "6,574", deaths: "263", region: "", total_recovered: "25"},{country_name: "Norway", cases: "6,219", deaths: "108", region: "", total_recovered: "32"},{country_name: "Australia", cases: "6,152", deaths: "53", region: "", total_recovered: "2,987"},{country_name: "Chile", cases: "5,972", deaths: "57", region: "", total_recovered: "1,274"},{country_name: "Poland", cases: "5,742", deaths: "175", region: "", total_recovered: "318"},{country_name: "Denmark", cases: "5,635", deaths: "237", region: "", total_recovered: "1,736"},{country_name: "Czechia", cases: "5,589", deaths: "113", region: "", total_recovered: "309"},{country_name: "Japan", cases: "5,530", deaths: "99", region: "", total_recovered: "685"},{country_name: "Peru", cases: "5,256", deaths: "138", region: "", total_recovered: "1,438"},{country_name: "Romania", cases: "5,202", deaths: "257", region: "", total_recovered: "647"},{country_name: "Ecuador", cases: "4,965", deaths: "272", region: "", total_recovered: "339"},{country_name: "Pakistan", cases: "4,601", deaths: "66", region: "", total_recovered: "727"},{country_name: "Malaysia", cases: "4,228", deaths: "67", region: "", total_recovered: "1,608"},{country_name: "Philippines", cases: "4,195", deaths: "221", region: "", total_recovered: "140"},{country_name: "Mexico", cases: "3,441", deaths: "194", region: "", total_recovered: "633"},{country_name: "Indonesia", cases: "3,293", deaths: "280", region: "", total_recovered: "252"},{country_name: "Saudi Arabia", cases: "3,287", deaths: "44", region: "", total_recovered: "666"},{country_name: "Luxembourg", cases: "3,115", deaths: "52", region: "", total_recovered: "500"},{country_name: "UAE", cases: "2,990", deaths: "14", region: "", total_recovered: "268"},{country_name: "Serbia", cases: "2,867", deaths: "66", region: "", total_recovered: "118"},{country_name: "Panama", cases: "2,752", deaths: "66", region: "", total_recovered: "16"},{country_name: "Finland", cases: "2,605", deaths: "42", region: "", total_recovered: "300"},{country_name: "Thailand", cases: "2,473", deaths: "33", region: "", total_recovered: "1,013"},{country_name: "Qatar", cases: "2,376", deaths: "6", region: "", total_recovered: "206"},{country_name: "Dominican Republic", cases: "2,349", deaths: "118", region: "", total_recovered: "80"},{country_name: "Colombia", cases: "2,223", deaths: "69", region: "", total_recovered: "174"},{country_name: "Ukraine", cases: "2,203", deaths: "69", region: "", total_recovered: "61"},{country_name: "Greece", cases: "1,955", deaths: "87", region: "", total_recovered: "269"},{country_name: "South Africa", cases: "1,934", deaths: "18", region: "", total_recovered: "95"},{country_name: "Singapore", cases: "1,910", deaths: "6", region: "", total_recovered: "460"},{country_name: "Argentina", cases: "1,894", deaths: "79", region: "", total_recovered: "365"},{country_name: "Egypt", cases: "1,699", deaths: "118", region: "", total_recovered: "348"},{country_name: "Algeria", cases: "1,666", deaths: "235", region: "", total_recovered: "347"},{country_name: "Iceland", cases: "1,648", deaths: "6", region: "", total_recovered: "688"},{country_name: "Belarus", cases: "1,486", deaths: "16", region: "", total_recovered: "139"},{country_name: "Croatia", cases: "1,407", deaths: "20", region: "", total_recovered: "219"},{country_name: "Morocco", cases: "1,374", deaths: "97", region: "", total_recovered: "109"},{country_name: "Moldova", cases: "1,289", deaths: "29", region: "", total_recovered: "56"},{country_name: "New Zealand", cases: "1,283", deaths: "2", region: "", total_recovered: "373"},{country_name: "Iraq", cases: "1,232", deaths: "69", region: "", total_recovered: "496"},{country_name: "Estonia", cases: "1,207", deaths: "24", region: "", total_recovered: "83"},{country_name: "Hungary", cases: "1,190", deaths: "77", region: "", total_recovered: "112"},{country_name: "Slovenia", cases: "1,124", deaths: "43", region: "", total_recovered: "128"},{country_name: "Lithuania", cases: "999", deaths: "17", region: "", total_recovered: "8"},{country_name: "Hong Kong", cases: "974", deaths: "4", region: "", total_recovered: "293"},{country_name: "Armenia", cases: "937", deaths: "11", region: "", total_recovered: "149"},{country_name: "Azerbaijan", cases: "926", deaths: "9", region: "", total_recovered: "101"},{country_name: "Kuwait", cases: "910", deaths: "1", region: "", total_recovered: "123"},{country_name: "Bahrain", cases: "887", deaths: "5", region: "", total_recovered: "519"},{country_name: "Bosnia and Herzegovina", cases: "875", deaths: "35", region: ""},{country_name: "Cameroon", cases: "803", deaths: "12", region: "", total_recovered: "61"},{country_name: "Kazakhstan", cases: "802", deaths: "9", region: "", total_recovered: "61"},{country_name: "Diamond Princess", cases: "712", deaths: "11", region: "", total_recovered: "619"},{country_name: "Slovakia", cases: "701", deaths: "2", region: "", total_recovered: "23"},{country_name: "North Macedonia", cases: "663", deaths: "30", region: "", total_recovered: "37"},{country_name: "Tunisia", cases: "643", deaths: "25", region: "", total_recovered: "25"},{country_name: "Bulgaria", cases: "624", deaths: "24", region: "", total_recovered: "54"},{country_name: "Uzbekistan", cases: "624", deaths: "3", region: "", total_recovered: "38"},{country_name: "Latvia", cases: "612", deaths: "3", region: "", total_recovered: "16", new_deaths: "0"},{country_name: "Andorra", cases: "583", deaths: "25", region: "", total_recovered: "58"},{country_name: "Lebanon", cases: "582", deaths: "19", region: "", total_recovered: "67"},{country_name: "Cyprus", cases: "564", deaths: "10", region: "", total_recovered: "53"},{country_name: "Costa Rica", cases: "539", deaths: "3", region: "", total_recovered: "30"},{country_name: "Afghanistan", cases: "521", deaths: "15", region: "", total_recovered: "32"},{country_name: "Cuba", cases: "515", deaths: "15", region: "", total_recovered: "28", new_deaths: "0"},{country_name: "Oman", cases: "484", deaths: "3", region: "", total_recovered: "109", new_deaths: "0"},{country_name: "Uruguay", cases: "473", deaths: "7", region: "", total_recovered: "206"},{country_name: "Ivory Coast", cases: "444", deaths: "3", region: "", total_recovered: "52"},{country_name: "Burkina Faso", cases: "443", deaths: "24", region: "", total_recovered: "146"},{country_name: "Niger", cases: "410", deaths: "11", region: "", total_recovered: "40", new_deaths: "0"},{country_name: "Albania", cases: "409", deaths: "23", region: "", total_recovered: "165"},{country_name: "Honduras", cases: "382", deaths: "23", region: "", total_recovered: "7"},{country_name: "Taiwan", cases: "382", deaths: "6", region: "", total_recovered: "91", new_deaths: "1"},{country_name: "Ghana", cases: "378", deaths: "6", region: "", total_recovered: "3", new_deaths: "0"},{country_name: "Jordan", cases: "372", deaths: "7", region: "", total_recovered: "161"},{country_name: "Réunion", cases: "362", deaths: "0", region: "", total_recovered: "40"},{country_name: "Channel Islands", cases: "361", deaths: "8", region: "", total_recovered: "40"},{country_name: "Malta", cases: "337", deaths: "2", region: "", total_recovered: "16", new_deaths: "0"},{country_name: "San Marino", cases: "333", deaths: "34", region: "", total_recovered: "49"}],
            search: "",
            worldCases:{"total_cases":"1,614,369","total_deaths":"96,788","total_recovered":"362,409","new_cases":"10,717","new_deaths":"1,096","statistic_taken_at":"2020-04-10 09:37:05"},
            loading: false,
            api: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/"
        };
    },
    computed: {
        getPercent() {
            let all = parseFloat(this.worldCases.total_recovered.replace(/,/g, ''));
            let rec = parseFloat(this.worldCases.total_cases.replace(/,/g, ''));
            return parseFloat(((all / rec) * 100).toFixed(2));     
        }
    },
    methods: {
        format(percentage) {
            return percentage === 100 ? 'Full' : `${percentage}%`;
        },
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
        // this.getAllCountry();
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
