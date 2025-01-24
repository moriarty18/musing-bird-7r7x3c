from flask import Flask, jsonify
import csv
from io import StringIO

app = Flask(__name__)

csv_data_string = """Ad group,Campaign,Campaign type,Ad group bid strategy type,Ads: active,Keywords: active,Clicks,Impr.,CTR,Currency code,Avg. CPC,Cost,Impr. (Abs. Top) %,Impr. (Top) %,Conversions,Cost / conv.,Conv. rate
алматы домик в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,0,0,0,USD,0,0.00,0,0,0.00,0,0
алматы домики в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,6,64,9.38%,USD,0.19,1.14,39.34%,54.10%,0.00,0,0.00%
аренда домиков в горах алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,58,237,24.47%,USD,0.22,12.55,48.34%,82.46%,0.00,0,0.00%
аренда юрты в горах алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,2,4,50.00%,USD,0.23,0.46,25.00%,25.00%,0.00,0,0.00%
база отдыха алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,69,806,8.56%,USD,0.24,16.70,28.32%,52.21%,3.00,5.57,4.35%
база отдыха алматы цена,Oi Search Отели и брони,Search,Maximize Conversions,1,3,0,0,0,USD,0,0.00,0,0,0.00,0,0
база отдыха в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,39,220,17.73%,USD,0.29,11.48,37.85%,67.76%,1.00,11.48,2.56%
база отдыха в горах цена,Oi Search Отели и брони,Search,Maximize Conversions,1,3,0,0,0,USD,0,0.00,0,0,0.00,0,0
базы отдыха в алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,5,84,5.95%,USD,0.2,1.02,20.00%,65.00%,0.00,0,0.00%
где в алмате можно отдохнуть на природе,Oi Search Отели и брони,Search,Maximize Conversions,1,3,0,1,0.00%,USD,0,0.00,0.00%,100.00%,0.00,0,0
где можно отдохнуть в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,0,1,0.00%,USD,0,0.00,100.00%,100.00%,0.00,0,0
гостевые дома в горах алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,18,98,18.37%,USD,0.27,4.89,29.47%,71.58%,0.00,0,0.00%
гостиница алматы в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,10,157,6.37%,USD,0.25,2.47,8.63%,62.59%,0.00,0,0.00%
гостиницы алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,28,504,5.56%,USD,0.25,6.96,9.79%,47.18%,0.50,13.86,1.79%
гостиницы алматы недорого,Oi Search Отели и брони,Search,Maximize Conversions,0,0,0,0,0,USD,0,0.00,0,0,0.00,0,0
гостиницы в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,0,0,0,USD,0,0.00,0,0,0.00,0,0
гостиницы в горах алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,15,163,9.20%,USD,0.17,2.57,10.00%,63.13%,0.00,0,0.00%
деревенька на деревьях,Oi Search Отели и брони,Search,Maximize Conversions,1,3,1,4,25.00%,USD,0.26,0.26,75.00%,75.00%,0.00,0,0.00%
дом на дереве алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,0,0,0,USD,0,0.00,0,0,0.00,0,0
дом на дереве цена алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,0,0,0,USD,0,0.00,0,0,0.00,0,0
дом отдыха в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,0,5,0.00%,USD,0,0.00,0,0,0.00,0,0
дома отдыха алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,30,235,12.77%,USD,0.22,6.65,28.05%,54.75%,4.00,1.66,13.33%
домик в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,7,48,14.58%,USD,0.35,2.44,58.54%,68.29%,0.00,0,0.00%
домик в горах алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,27,155,17.42%,USD,0.22,5.81,42.76%,78.62%,0.00,0,0.00%
домик в горах алматы аренда,Oi Search Отели и брони,Search,Maximize Conversions,1,3,23,89,25.84%,USD,0.21,4.72,36.47%,82.35%,0.00,0,0.00%
домик на дереве алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,1,1,100.00%,USD,0.12,0.12,100.00%,100.00%,0.00,0,0.00%
домики в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,19,103,18.45%,USD,0.24,4.51,47.92%,68.75%,0.00,0,0.00%
домики в горах алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,4,103,434,23.73%,USD,0.22,22.43,43.28%,78.97%,5.00,4.49,4.85%
домики в горах алматы на двоих,Oi Search Отели и брони,Search,Maximize Conversions,1,3,20,58,34.48%,USD,0.18,3.64,52.63%,80.70%,1.00,3.64,5.00%
домики в лесной сказке,Oi Search Отели и брони,Search,Maximize Conversions,1,3,25,156,16.03%,USD,0.21,5.25,38.10%,74.15%,0.46,11.46,1.83%
домики на деревьях,Oi Search Отели и брони,Search,Maximize Conversions,1,3,0,0,0,USD,0,0.00,0,0,0.00,0,0
домики на деревьях алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,2,2,100.00%,USD,0.15,0.29,50.00%,100.00%,0.00,0,0.00%
зоны отдыха,Oi Search Отели и брони,Search,Maximize Conversions,1,3,12,210,5.71%,USD,0.13,1.59,18.38%,42.65%,0.00,0,0.00%
отдохнуть в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,0,0,0,USD,0,0.00,0,0,0.00,0,0
отдых в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,87,414,21.01%,USD,0.3,26.24,53.30%,75.38%,4.00,6.56,4.60%
отдых в горах алматы домики,Oi Search Отели и брони,Search,Maximize Conversions,1,3,92,432,21.3%,0.22,20.54,43.52%,76.53%,4.00,5.14,4.35%
отдых в горах с детьми,Oi Search Отели и брони,Search,Maximize Conversions,1,3,3,11,27.27%,USD,0.21,0.63,60.00%,60.00%,0.00,0,0.00%
отдых в лесной сказке,Oi Search Отели и брони,Search,Maximize Conversions,1,3,2,3,66.67%,USD,0.19,0.37,100.00%,100.00%,0.00,0,0.00%
отели алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,44,561,7.84%,USD,0.22,9.83,18.62%,56.16%,3.00,3.28,6.82%
отели алматы в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,23,263,8.75%,USD,0.22,5.17,10.84%,65.46%,0.00,0,0.00%
отели алматы недорого,Oi Search Отели и брони,Search,Maximize Conversions,1,3,6,289,2.08%,USD,0.21,1.24,1.72%,29.74%,0.00,0,0.00%
отель алматы в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,2,16,12.50%,USD,0.19,0.38,18.75%,81.25%,1.00,0.38,50.00%
отель в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,2,51,3.92%,USD,0.05,0.1,0,0,0
семейный отдых алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,45,311,14.47%,USD,0.18,8.12,1,8.12,2.22%
семейный отдых в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,2,14,14.29%,USD,0.19,0.37,0,0,0
снять домик в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,10,52,19.23%,USD,0.27,2.68,1,2.68,10.00%
снять домик в горах алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,8,24,33.33%,USD,0.21,1.71,0,0,0
снять домик на дереве алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,0,0,0,USD,0,0.00,0,0,0.00,0,0
спа отель алматы в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,2,2,100.00%,USD,0.39,0.78,0,0,0
эко отель в горах,Oi Search Отели и брони,Search,Maximize Conversions,1,3,3,19,15.79%,USD,0.21,0.63,0,0,0
эко отель в горах алматы,Oi Search Отели и брони,Search,Maximize Conversions,1,3,14,119,11.76%,USD,0.27,3.73,0,0,0
""".strip()

def clean_value(value):
    cleaned_value = value.replace('%', '').replace('"', '').replace(',', '.')
    if cleaned_value == 'USD' or cleaned_value == '--':
        return '0'
    return cleaned_value

def parse_csv_data(csv_string):
    data = []
    f = StringIO(csv_string)
    reader = csv.reader(f)
    headers = next(reader)
    headers = next(reader)
    for row in reader:
        if row and row[0] != 'Ad group performance':
            ad_group_data = {}
            for i, header in enumerate(headers):
                value = row[i]
                cleaned_value = clean_value(value)
                if header in ["Clicks", "Impr.", "Conversions", "View-through conv."]:
                    ad_group_data[header] = int(float(cleaned_value)) if cleaned_value else 0
                elif header in ["CTR", "Avg. CPC", "Cost", "Impr. (Abs. Top) %", "Impr. (Top) %", "Cost / conv.", "Conv. rate"]:
                    ad_group_data[header] = float(cleaned_value) if cleaned_value else 0
                else:
                    ad_group_data[header] = value
            data.append(ad_group_data)
    return data

def calculate_totals(data):
    total_clicks = sum(item['Clicks'] for item in data)
    total_impressions = sum(item['Impr.'] for item in data)
    total_cost = sum(item['Cost'] for item in data)
    total_conversions = sum(item['Conversions'] for item in data)

    total_ctr = (total_clicks / total_impressions) * 100 if total_impressions > 0 else 0
    avg_cpc = total_cost / total_clicks if total_clicks > 0 else 0
    total_conv_rate = (total_conversions / total_clicks) * 100 if total_clicks > 0 else 0
    avg_cost_per_conv = total_cost / total_conversions if total_conversions > 0 else 0

    return {
        "total_clicks": total_clicks,
        "total_impressions": total_impressions,
        "total_cost": total_cost,
        "total_conversions": total_conversions,
        "total_ctr": total_ctr,
        "avg_cpc": avg_cpc,
        "total_conv_rate": total_conv_rate,
        "avg_cost_per_conv": avg_cost_per_conv,
    }

def analyze_performance(data):
    insights = []

    # 1. Группы объявлений без конверсий, но с расходами
    no_conversion_ad_groups = [
        item["Ad group"]
        for item in data
        if item["Conversions"] == 0 and float(item["Cost"]) > 0
    ]
    if no_conversion_ad_groups:
        insights.append(
            f"Группы объявлений с расходами, но без конверсий: {', '.join(no_conversion_ad_groups)}. "
            "Рекомендуется проверить релевантность ключевых слов и объявлений, а также посадочные страницы."
        )

    # 2. Группы объявлений с высокой стоимостью конверсии
    high_cpc_conv_ad_groups = [
        item["Ad group"]
        for item in data
        if item["Conversions"] > 0 and float(item["Cost / conv."]) > 8  # Порог Cost / conv.
    ]
    if high_cpc_conv_ad_groups:
        insights.append(
            f"Группы объявлений с высокой стоимостью конверсии: {', '.join(high_cpc_conv_ad_groups)}. "
            "Необходимо проанализировать ставки и качество объявлений для этих групп."
        )

    # 3. Группы объявлений с высоким CTR, но низкой конверсией (CTR > 15% и Conv. Rate < 2%)
    high_ctr_low_conv_ad_groups = [
        item["Ad group"]
        for item in data
        if float(item["CTR"].replace('%', '').replace(',', '.')) > 15 and float(item["Conv. rate"].replace('%', '').replace(',', '.')) < 2 and int(item["Clicks"]) > 10 # добавим условие по кликам, чтобы исключить случайности
    ]
    if high_ctr_low_conv_ad_groups:
        insights.append(
            f"Группы объявлений с высоким CTR, но низкой конверсией: {', '.join(high_ctr_low_conv_ad_groups)}. "
            "Проверьте соответствие объявлений и посадочных страниц, проблемы с UX."
        )

    # 4. Лучшие группы объявлений по конверсиям (топ 3)
    top_conversion_ad_groups = sorted(
        [item for item in data if float(item["Conversions"]) > 0],
        key=lambda x: float(x["Conversions"]),
        reverse=True,
    )[:3]
    if top_conversion_ad_groups:
        top_ad_group_names = ', '.join([item["Ad group"] for item in top_conversion_ad_groups])
        insights.append(
            f"Топ-3 групп объявлений по конверсиям: {top_ad_group_names}. "
            "Рассмотрите масштабирование: увеличьте бюджеты или расширьте таргетинг."
        )

    # 5. Данные для графиков
    # Топ-5 групп по расходам для круговой диаграммы
    top_cost_ad_groups_pie = sorted(
        data, key=lambda x: float(x["Cost"]), reverse=True
    )[:5]

    pie_chart_data = [
        {'name': item["Ad group"], 'value': float(item["Cost"])}
        for item in top_cost_ad_groups_pie
    ]
    # Добавим "Остальные"
    other_cost = sum(float(item["Cost"]) for item in data) - sum(item['value'] for item in pie_chart_data)
    pie_chart_data.append({'name': 'Остальные', 'value': other_cost if other_cost > 0 else 0})


    # Топ-10 групп по показам для столбчатой диаграммы
    top_impression_ad_groups_bar = sorted(
        data, key=lambda x: int(x["Impr."]), reverse=True
    )[:10]

    bar_chart_data = [
        {'name': item["Ad group"], 'ctr': float(item["CTR"].replace('%', '').replace(',', '.')), 'convRate': float(item["Conv. rate"].replace('%', '').replace(',', '.'))}
        for item in top_impression_ad_groups_bar
    ]

    return insights, pie_chart_data, bar_chart_data


@app.route('/api/data')
def get_dashboard_data():
    dashboard_data = calculate_dashboard_data() # Вызов функции для расчета данных
    return jsonify(dashboard_data)

def calculate_dashboard_data():
    parsed_data = parse_csv_data(csv_data_string)
    totals = calculate_totals(parsed_data)
    insights, pie_chart_data, bar_chart_data = analyze_performance(parsed_data)

    dashboard_data = {
        'totals': totals,
        'insights': insights,
        'pieChartData': pie_chart_data,
        'barChartData': bar_chart_data,
    }
    return dashboard_data

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port=5000)
