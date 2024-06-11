import Chart from 'chart.js/auto';

// TODO: Handle async data fetching
export default function (
		inquiriesChart: Chart<"doughnut", number[], string>,
		inquiriesPerMonthChart: Chart<"bar", number[], string>,
		inquiriyResponseTimeChart: Chart<"line", number[], string>,
		
		incomePerQuarterChart: Chart<"doughnut", number[], string>,
		incomePerMonthChart: Chart<"line", number[], string>,
		incomePerYearChart: Chart<"line", number[], string> = {} as Chart<"line", number[], string>
	) {
	const inquiryChart1 = document.querySelector('.inquiry-breakdown-chart') as HTMLCanvasElement;
	inquiriesChart = new Chart(inquiryChart1, {
		type: 'doughnut',
		data: {
			labels: ['Pending', 'Accepted', 'Declined'],
			datasets: [{
				label: 'Inquiries',
				data: [10, 20, 5],
				backgroundColor: [
					'#edf2f7',
					'#c6f6d5',
					'#fed7d7',
				],
				borderColor: [
					'#4a5568',
					'#285e61',
					'#c53030',
				],
				borderWidth: 2
			}]
		},
		options: {
			// NOTE: Needs { responsive: true, aspectRatio: 1.4 } to size correctly
			responsive: true,
			aspectRatio: 1.4,
		}
	});

	const inquiryChart2 = document.querySelector('.inquiries-per-month-chart') as HTMLCanvasElement;
	inquiriesPerMonthChart = new Chart(inquiryChart2, {
		type: 'bar',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			datasets: [{
				label: 'Inquiries per Month',
				data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
				backgroundColor: '#edf2f7',
				borderColor: '#4a5568',
				borderWidth: 3
			}]
		},
		options: {
			plugins: {
				legend: {
					display: false
				}
			},
			scales: {
				y: {
					beginAtZero: true
				}
			},
		}
	});
	// TODO: Show data for each type of inquiry
	const inquiryChart3 = document.querySelector('.inquiriy-response-time-month-chart') as HTMLCanvasElement;
	inquiriyResponseTimeChart = new Chart(inquiryChart3, {
		type: 'line',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			datasets: [
				{
					label: 'Type A',
					data: [12, 19, 3, 5, 2, 3, 12, 15, 22, 10, 18, 7],
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderColor: 'rgba(255, 99, 132, 1)',
					borderWidth: 1
				},
				{
					label: 'Type B',
					data: [8, 11, 5, 9, 3, 5, 6, 9, 15, 13, 10, 6],
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					borderColor: 'rgba(54, 162, 235, 1)',
					borderWidth: 1
				},
				{
					label: 'Type C',
					data: [6, 9, 4, 8, 7, 3, 4, 7, 10, 11, 9, 5],
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1
				}
			]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						stepSize: 5
					},
					grid: {
						display: true,
						color: 'rgba(200, 200, 200, 0.2)'
					}
				},
				x: {
					stacked: true,
					grid: {
						display: false
					}
				}
			},
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					enabled: true
				},
			}
		}
	});

	
	const incomeChart1 = document.querySelector('.income-per-quarter-chart') as HTMLCanvasElement;
	incomePerQuarterChart = new Chart(incomeChart1, {
		type: 'doughnut',
		data: {
			labels: ['Q1', 'Q2', 'Q3', 'Q4'],
			datasets: [{
				label: 'Income per Quarter',
				data: [1000, 2000, 3000, 4000],
				backgroundColor: [
					'#c3dafe',
					'#a3bffa',
					'#7f9cf5',
					'#667eea',
				],
				borderColor: [
					'#7f9cf5',
					'#667eea',
					'#5a67d8',
					'#4c51bf',
				],
				borderWidth: 2
			}]
		},
		options: {
			// NOTE: Needs { responsive: true, aspectRatio: 1.4 } to size correctly
			responsive: true,
			aspectRatio: 1.4,
		}
	});

	const incomeChart2 = document.querySelector('.income-per-month-chart') as HTMLCanvasElement;
	incomePerMonthChart = new Chart(incomeChart2, {
		type: 'line',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			datasets: [{
				label: 'Income per Month',
				data: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000],
				backgroundColor: '#edf2f7',
				borderColor: '#4a5568',
				borderWidth: 3
			}]
		},
		options: {
			plugins: {
				legend: {
					display: false
				}
			},
			aspectRatio: 4.2,

			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});

	return {
		myInquiriesChart: inquiriesChart,
		myInquiriesPerMonthChart: inquiriesPerMonthChart,
		myInquiriyResponseTimeChart: inquiriyResponseTimeChart,
		myIncomePerQuarterChart: incomePerQuarterChart,
		myIncomePerMonthChart: incomePerMonthChart,
	}
}