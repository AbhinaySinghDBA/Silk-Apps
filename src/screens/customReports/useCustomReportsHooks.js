import { useCallback, useState } from 'react';
import { api } from '../../services/endpoints';
import axiosAuthInstance from '../../services/axiosAuthInstance';
import axiosMatricInstance from '../../services/axiosMatricInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LabelHelper = (matrix) => {
    switch (matrix.unit_name) {
        case 'Amount':
            return `${matrix.name}`;
        case 'Percentage':
            return `${matrix.name} `;
        default:
            return `${matrix.name}`;
            
    }
};

function roundToTwoDecimalPlaces(number) {
    number *= 1;
    if (!number) return 0.00;
    return (Math.round(number * 100) / 100).toFixed(2);
}

const UseCustomReportsHooks = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const setIsLoadingTrue = () => setIsLoading(true)
    const setIsRefreshingTrue = () => setIsRefreshing(true)


    const setIsLoadingFalse = () => setIsLoading(false)
    const setIsRefreshingFalse = () => setIsRefreshing(false)

    const errorHandler = () => {
        setIsLoading(false)
        setIsError(true)
    }

    const [reportsPresets, setReportsPresets] = useState([]);

    // const [usersList, setUsersList] = useState({});
    // const [matrixList, setMatrixList] = useState([]);
    // const [filteredMatrixLists, setFilteredMatrixLists] = useState([]);
    const [matrixData, setMatrixData] = useState({
        datasets: [],
        labels: [],
        meta: {
            year: 2023,
            report_name: '',
        },
        isData: false,
    });

    const barColorFn = (view, i) => {
        const barColor = [
            '#233D4D',
            '#457B9D',
            '#3DA5D9',
            '#06D6A0',
            '#OEAD69',
            '#EF233C',
            '#FF5400',
            '#FCA311',
            '#FCCA46',
            '#FIFAEE',


        ];
        const lightBarColor = [
            '#233D4D',
            '#457B9D',
            '#3DA5D9',
            '#06D6A0',
            '#OEAD69',
            '#EF233C',
            '#FF5400',
            '#FCA311',
            '#FCCA46',
            '#FIFAEE',
        ];

        switch (view) {
            case 'BAR':
                return {
                    current: {
                        backgroundColor: barColor[i],
                        borderColor: lightBarColor[i],
                    },
                    budget: {
                        backgroundColor: lightBarColor[i],
                        borderColor: barColor[i],
                    },
                };
            default:
                return {
                    current: {
                        backgroundColor: lightBarColor[i],
                        borderColor: barColor[i],
                    },
                    budget: {
                        backgroundColor: barColor[i],
                        borderColor: lightBarColor[i],
                    },
                };
        }
    };

    const fetchReportPresets = async (isRefreshing = false) => {
        try {
            setIsError(false)
            if (isRefreshing) setIsRefreshingTrue()
            else setIsLoadingTrue()

            const user = await AsyncStorage.getItem('userVerifiedDetails');
            let user_obj = JSON.parse(user);

            const {
                data: { data },
            } = await axiosAuthInstance.get(api.reportPresets.GET(user_obj.company_id));
            setReportsPresets(data?.items);

            if (isRefreshing) setIsRefreshingFalse()
            else setIsLoadingFalse()

        } catch (error) {
            errorHandler()
            if (isRefreshing) setIsRefreshingFalse()
        }
    };

    const fetchMatrixData = async (report, from, to, periodicity = 1, budget = false) => {
        try {
            setIsError(false)
            setIsLoading(true)
            let isData = false;

            let matrixIds = report.matrix.map((i) => i?.id);
            let company_id = report.company_id;

            const body = {
                company_metric_ids: matrixIds,
                from: from,
                to: to,
                period: periodicity,
                view: report?.view || 'TABLE',
                budget: budget,
            };




            const { data: { data, labels } } = await axiosMatricInstance.post(api.reportBody.POST(), body);

            let i = 0;
            const datasets = [];
            const dataSetWithBudget = [];

            let meta = {
                view: report.view,
                report_name: report.name,
                report_view: report?.periodicity || 1,
                isBudgetCompare: budget,
            };



            for (const item of data) {
                let temp = {};
                let budgetTemp = {};
                let barColors = barColorFn(report?.view || 'TABLE', i);

                if (report?.view == 'BAR' || report?.view == 'LINE') {
                    budgetTemp.id = item?.id;
                    budgetTemp.label = `Budget | ${item.name}`;
                    budgetTemp.borderColor = barColors.budget.borderColor;
                    budgetTemp.backgroundColor = barColors.budget.backgroundColor;

                    budgetTemp.data = item?.budget_values;
                    dataSetWithBudget.push(budgetTemp);
                }

                temp.id = item?.id;
                temp.label = LabelHelper(item);
                temp.borderColor = barColors.current.borderColor;
                temp.backgroundColor = barColors.current.backgroundColor;
                temp.data = item.values;
                temp.budget = item?.budget_values;
                datasets.push(temp);
                dataSetWithBudget.push(temp);

                i++;
            }


            if (datasets.length && labels.length) {
                isData = true;
            }

            setMatrixData({ isData, labels, datasets, meta });
            setIsLoading(false)

            // if (report?.view == 'BAR' || report?.view == 'LINE') {
            //     const result = [datasets, dataSetWithBudget];
            //     setMatrixData({ datasets: result, isData, labels, meta });
            // } else {
            //     setMatrixData({ isData, labels, datasets, meta });
            // }

        } catch (error) {
            debugger
            setIsLoading(false)
            setIsError(true)
        }
    };

    const refreshFetchReportPresets = useCallback(() => {
        fetchReportPresets(true)
    }, []);

    return ({ isLoading, isError, isRefreshing, reportsPresets, matrixData, fetchReportPresets, fetchMatrixData, refreshFetchReportPresets })
}

export default UseCustomReportsHooks