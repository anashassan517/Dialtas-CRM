// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import AnalyticsProject from 'src/views/dashboards/analytics/AnalyticsProject'
import AnalyticsOrderVisits from 'src/views/dashboards/analytics/AnalyticsOrderVisits'
import AnalyticsTotalEarning from 'src/views/dashboards/analytics/AnalyticsTotalEarning'
import AnalyticsSourceVisits from 'src/views/dashboards/analytics/AnalyticsSourceVisits'
import AnalyticsEarningReports from 'src/views/dashboards/analytics/AnalyticsEarningReports'
import AnalyticsSupportTracker from 'src/views/dashboards/analytics/AnalyticsSupportTracker'
import AnalyticsSalesByCountries from 'src/views/dashboards/analytics/AnalyticsSalesByCountries'
import AnalyticsMonthlyCampaignState from 'src/views/dashboards/analytics/AnalyticsMonthlyCampaignState'
import AnalyticsWebsiteAnalyticsSlider from 'src/views/dashboards/analytics/AnalyticsWebsiteAnalyticsSlider'

// ** Custom Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsWithAreaChart from 'src/@core/components/card-statistics/card-stats-with-area-chart'

const AnalyticsDashboard = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={6}>
            <AnalyticsWebsiteAnalyticsSlider />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <AnalyticsOrderVisits />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <CardStatsWithAreaChart
              stats='97.5k'
              chartColor='success'
              avatarColor='success'
              title='Revenue Generated'
              avatarIcon='tabler:credit-card'
              chartSeries={[{ data: [6, 35, 25, 61, 32, 84, 70] }]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <AnalyticsEarningReports />
          </Grid>
          <Grid item xs={12} md={6}>
            <AnalyticsSupportTracker />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsSalesByCountries />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTotalEarning />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsMonthlyCampaignState />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsSourceVisits />
          </Grid>
          <Grid item xs={12} lg={8}>
            <AnalyticsProject />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard

// import React, { useState } from 'react'
// import { SalesDashboard } from '../sales'
// import { ReportsDashboard } from '../reports'

// import PropTypes from 'prop-types'
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
// import Typography from '@mui/material/Typography'
// import Box from '@mui/material/Box'

// const AnalyticsDashboard = () => {
//   const [currentTab, setCurrentTab] = useState('sales')

//   const handleChange = (event, newTab) => {
//     setCurrentTab(newTab)
//   }

//   return (
//     <Box sx={{ mt: 3 }}>
//       <Tabs value={currentTab} onChange={handleChange}>
//         <Tab label='Sales' />
//         <Tab label='Reports' />
//         <Tab label='Settings' />
//       </Tabs>
//       <Box sx={{ mt: 2 }}>
//         {currentTab === 'sales' && <SalesDashboard />}

//         {currentTab === 'reports' && <ReportsDashboard />}
//         {
//           currentTab === 'settings'

//           //  &&
//           //  <SettingsContent />
//         }
//       </Box>
//     </Box>
//   )
// }

// export default AnalyticsDashboard
