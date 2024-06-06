import Chart from 'chart.js/auto';

// TODO: Handle async data fetching
export default function (
		inquiriesChart: Chart<"doughnut", number[], string>,
		inquiriesPerMonthChart: Chart<"bar", number[], string>,
		inquiriyResponseTimeChart: Chart<"line", number[], string>,
		
		incomePerQuarterChart: Chart<"doughnut", number[], string>,
		incomePerMonthChart: Chart<"bar", number[], string>,
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
			}
		}
	});

	const inquiryChart3 = document.querySelector('.inquiriy-response-time-month-chart') as HTMLCanvasElement;
	inquiriyResponseTimeChart = new Chart(inquiryChart3, {
		type: 'line',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			datasets: [{
				label: 'Inquiry Response Time',
				data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
				backgroundColor: '#edf2f7',
				borderColor: '#4a5568',
				
				borderWidth: 3,
				pointBorderWidth: 5,

				pointHoverBorderWidth: 5,
				pointHoverRadius: 5,

				pointHitRadius: 10,	
			}],
		},
		options: {
			plugins: {
				legend: {
					display: false
				},
			},
			scales: {
				y: {
					beginAtZero: true
				}
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
		type: 'bar',
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