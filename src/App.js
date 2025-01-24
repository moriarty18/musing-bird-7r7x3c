import React, { useState, useEffect } from 'react';
import './styles.css';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const csvData = `Ad group performance,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"January 1, 2025 - January 23, 2025",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Ad group,Campaign,Campaign state,Ad group state,Campaign type,Campaign subtype,Labels on Ad group,Ad group bid strategy,Ad group bid strategy type,Ad group sitelinks: active,Ad group sitelinks: disapproved,Ad group sitelinks level,Ad group phone numbers: active,Ad group phone numbers: disapproved,Ad group phone numbers level,Ad group apps: active,Ad group apps: disapproved,Ad group apps level,Ad group desktop bid adj.,Ad group mobile bid adj.,Ad group tablet bid adj.,Ads: active,Ads: disapproved,Keywords: active,Keywords: disapproved,Clicks,Impr.,CTR,Currency code,Avg. CPC,Cost,Impr. (Abs. Top) %,Impr. (Top) %,Conversions,View-through conv.,Cost / conv.,Conv. rate
алматы домик в горах,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,0,0,0%,USD,0,0,0%,0%,0,0,0,0%
алматы домики в горах,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,6,64,"9,38%",USD,"0,19","1,14","39,34%","54,1%",0,0,0,0%
аренда домиков в горах алматы,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,58,237,"24,47%",USD,"0,22","12,55","48,34%","82,46%",0,0,0,0%
аренда юрты в горах алматы,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,2,4,50%,USD,"0,23","0,46",25%,25%,0,0,0,0%
база отдыха алматы,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,69,806,"8,56%",USD,"0,24","16,7","28,32%","52,21%",3,0,"5,57","4,35%"
база отдыха в горах,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,39,220,"17,73%",USD,"0,29","11,48","37,85%","67,76%",1,0,"11,48","2,56%"
базы отдыха в алматы,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,5,84,"5,95%",USD,"0,2","1,02",20%,65%,0,0,0,0%
гостевые дома в горах алматы,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,18,98,"18,37%",USD,"0,27","4,89","29,47%","71,58%",0,0,0,0%
гостиница алматы в горах,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,10,157,"6,37%",USD,"0,25","2,47","8,63%","62,59%",0,0,0,0%
гостиницы алматы,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,28,504,"5,56%",USD,"0,25","6,96","9,79%","47,18%","0,5",0,"13,86","1,79%"
гостиницы в горах алматы,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,15,163,"9,2%",USD,"0,17","2,57",10%,"63,13%",0,0,0,0%
дома отдыха алматы,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,30,235,"12,77%",USD,"0,22","6,65","28,05%","54,75%",4,0,"1,66","13,33%"
домик в горах алматы,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,27,155,"17,42%",USD,"0,22","5,81","42,76%","78,62%",0,0,0,0%
домики в горах алматы,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,0,0,--,--,--,--,1,0,4,0,103,434,"23,73%",USD,"0,22","22,43","43,28%","78,97%",5,0,"4,49","4,85%"
отдых в горах,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,87,414,"21,01%",USD,"0,3","26,24","53,3%","75,38%",4,0,"6,56","4,6%"
отели алматы,Oi Search Отели и брони,Enabled,Enabled,Search,All features,--,--,Maximize Conversions,0,0,--,0,0,--,0,0,--,0,0,--,--,--,--,1,0,3,0,44,561,"7,84%",USD,"0,22","9,83","18,62%","56,16%",3,0,"3,28","6,82%"
""";

const parsedData = parseCSVData(csvData);
const totals = calculateTotals(parsedData);
const insights = analyzePerformance(parsedData);

// Данные для круговой диаграммы (распределение расходов)
const pieChartData = parsedData.sort((a, b) => parseFloat(b.Cost) - parseFloat(a.Cost)).slice(0, 5).map(item => ({ name: item["Ad group"], value: parseFloat(item.Cost) }));
const otherCost = totals.total_cost - pieChartData.reduce((sum, item) => sum + item.value, 0);
pieChartData.push({ name: 'Остальные', value: otherCost > 0 ? otherCost : 0 });

// Данные для столбчатой диаграммы (CTR vs Conv. Rate)
const barChartData = parsedData.sort((a, b) => b['Impr.'] - a['Impr.']).slice(0, 10).map(item => ({ name: item["Ad group"], ctr: parseFloat(item.CTR), convRate: parseFloat(item["Conv. rate"])}))
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];


  return (
    
      
        
          
            <h1>Ad Campaign Performance Dashboard</h1>
            
          
          
            
              
                
                  
                    <h3>Clicks</h3>
                    
                  
                  
                    <h3>Impressions</h3>
                    
                  
                  
                    <h3>CTR</h3>
                    
                  
                  
                    <h3>Total Cost</h3>
                    
                  
                  
                    <h3>Conversions</h3>
                    
                  
                  
                    <h3>Conv. Rate</h3>
                    
                  
                  
                    <h3>Avg. CPC</h3>
                    
                  
                  
                    <h3>Cost / Conv.</h3>
                    
                  
                
              
            
    

            
              
                
                  
                    
                      
                        
                      
                    
                    
                      Cost Distribution by Ad Groups
                    
                  
                
                
                  
                    
                      
                        
                      
                    
                    
                      CTR vs Conversion Rate (Top 10 by Impr.)
                    
                  
                
              
            
    

            
              
                <h2>Insights and Recommendations</h2>
                
                  {insights.map((insight, index) => (
                    
                      {insight}
                    
                  ))}
                
              
            
    

      
        
      
    
  );
}

function clean_value(value) {
    let cleanedValue = value.replace('%', '').replace('"', '').replace(',', '.');
    if (cleanedValue === 'USD' || cleanedValue === '--') {
        return '0';
    }
    return cleanedValue;
}

function parseCSVData(csvString) {
    const data = [];
    const lines = csvString.trim().split('\n');
    const headers = lines[2].split(',').map(header => header.trim());
    for (let i = 3; i < lines.length; i++) {
        const row = lines[i].split(',');
        if (row && row[0] !== 'Ad group performance') {
            const adGroupData = {};
            for (let j = 0; j < headers.length; j++) {
                const header = headers[j];
                let value = row[j] ? row[j].trim() : '';
                const cleanedValue = cleanValue(value);
                if (["Clicks", "Impr.", "Conversions"].includes(header)) {
                    adGroupData[header] = parseInt(parseFloat(cleanedValue));
                } else if (["CTR", "Avg. CPC", "Cost", "Impr. (Abs. Top) %", "Impr. (Top) %", "Cost / conv.", "Conv. rate"].includes(header)) {
                    adGroupData[header] = parseFloat(cleanedValue);
                } else {
                    adGroupData[header] = value;
                }
            }
            data.push(adGroupData);
        }
    }
    return data;
};

function calculateTotals(data) {
    let totalClicks = 0;
    let totalImpressions = 0;
    let totalCost = 0;
    let totalConversions = 0;

    data.forEach(item => {
        totalClicks += item['Clicks'];
        totalImpressions += item['Impr.'];
        totalCost += item['Cost'];
        totalConversions += item['Conversions'];
    });

    const totalCtr = (totalClicks / totalImpressions) * 100;
    const avgCpc = totalClicks > 0 ? totalCost / totalClicks : 0;
    const totalConvRate = (totalConversions / totalClicks) * 100;
    const avgCostPerConv = totalConversions > 0 ? totalCost / totalConversions : 0;

    return {
        total_clicks: totalClicks,
        total_impressions: totalImpressions,
        total_cost: totalCost,
        total_conversions: totalConversions,
        total_ctr: totalCtr,
        avg_cpc: avgCpc,
        total_conv_rate: totalConvRate,
        avg_cost_per_conv: avgCostPerConv
    };
};

function analyzePerformance(data) {
    const insights = [];

    const noConversionAdGroups = data.filter(item => item.Conversions === 0
