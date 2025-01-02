
# EU Spending, Revenue, and Net Balance by Country Visualization

QGIS projects and related materials for cartographic visualization of EU spending, revenue, and net balance.

## EU Spending, Revenue, and Net Balance by Country (2023, mn €)

EU Spending, Revenue, and Net Balance Map

The map illustrates EU spending, revenue, and net balance by country for 2023 in millions of euros.

### Data Source

This visualization is based on data from the European Commission website, specifically the report "EU spending and revenue 2021-2027" and the file "EU spending and revenue - Data 2000-2023".

### Methodology

- **Spending**: "TOTAL EXPENDITURE" row for 2023 used for individual countries and EU-27 total.
- **Revenue**: "TOTAL Own resources" row from the REVENUE section for 2023 used for individual countries and EU-27 total.
- **Net Balance**: Calculated as the difference between revenue and spending, rounded to the nearest million euros.

### Design Choices

- Color scale inspired by the chart in "Which Countries are EU Contributors and Beneficiaries?"
- Country borders sourced from Eurostat.
- Net balance gradient implemented using D3 library's gradient legend.

### Tools Used

- QGIS for map creation
- D3 library for gradient legend

### Additional Resources

- [Eurostat Country Borders Source](https://ec.europa.eu/eurostat/web/gisco)
- [Inspiration: "Which Countries are EU Contributors and Beneficiaries?"](https://www.reddit.com/r/MapPorn/comments/1hq7y6i/eu_spending_revenue_net_balance_by_country_2023_mn/)

Citations:
[1] [EU spending and revenue 2021-2027](https://commission.europa.eu/strategy-and-policy/eu-budget/long-term-eu-budget/2021-2027/spending-and-revenue_en)
[2] [Countries borders](https://ec.europa.eu/eurostat/web/gisco)
[3] [Population](https://ec.europa.eu/eurostat/databrowser/view/DEMO_GIND__custom_10293339/bookmark/table?lang=en&bookmarkId=cdf29d2c-8d15-4f2c-96b6-a51f8a389103)
[4] [Icons flags](https://github.com/hampusborgos/country-flags)