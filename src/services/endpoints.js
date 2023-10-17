
export const api = {
    metricDetails: {
        GET: (companyId, metricIds, year, listedBy) => `/metric/report/metric-details?company_id=${companyId}&company_metric_ids=${metricIds}&year=${year}&list_by=${listedBy}`,
        POST: () => `/metric/metric-details`,
        PUT: () => `/`
    },
    metricList: {
        GET: (companyId) => `/metric/report/metric-list?company_id=${companyId}`
    },

    metricBudget: {

        POST: () => '/metric/metric-budget-details',

    },
    companyMetric: {

        POST: () => '/metric/company-metrics',

    },
    reportPresets: {
        GET: (companyId) => `/auth/report-presets/${companyId}`,
        POST: () => `/auth/report-presets`,
        PUT: (id) => `/auth/report-presets/${id}`,
        DELETE: (id) => `/auth/report-presets/${id}`
    },
    reportBody: {
        POST: () => `/metric/reports-all-data`
    },
    users: {
        GET: () => `/auth/users-by-company`
    }
}