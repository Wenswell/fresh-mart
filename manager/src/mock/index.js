import Mock from "mockjs";
import homeApi from "./home";

Mock.mock('/api/home/getData', 'get', homeApi.getStatisticaData)
