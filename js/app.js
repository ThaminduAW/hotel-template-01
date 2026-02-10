
// Mock Data for Hotel Management System

const hotelData = {
    branding: {
        name: "Azure Horizon",
        logo: "../assets/logo/logo.png", // Placeholder path
        colors: {
            primary: "#0f172a", // Navy Blue
            secondary: "#cca43b" // Gold
        }
    },
    rooms: [
        { id: 101, type: "Deluxe Suite", price: 250, status: "Available", floor: 1, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80" },
        { id: 102, type: "Standard King", price: 150, status: "Booked", floor: 1, image: "https://images.unsplash.com/photo-1590490360182-c87295ecc039?auto=format&fit=crop&w=800&q=80" },
        { id: 103, type: "Standard Twin", price: 140, status: "Cleaning", floor: 1, image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80" },
        { id: 201, type: "Presidential Suite", price: 550, status: "Maintenance", floor: 2, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
        { id: 202, type: "Ocean View", price: 300, status: "Available", floor: 2, image: "https://images.unsplash.com/photo-1565623833408-d77e39b88af6?auto=format&fit=crop&w=800&q=80" },
        { id: 203, type: "Ocean View", price: 300, status: "Booked", floor: 2, image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&w=800&q=80" }
    ],
    bookings: [
        { id: "BK-7829", guest: "Sarah Conner", room: 102, checkIn: "2023-10-25", checkOut: "2023-10-28", status: "Active", amount: 450 },
        { id: "BK-7830", guest: "John Wick", room: 201, checkIn: "2023-11-01", checkOut: "2023-11-05", status: "Pending", amount: 2200 },
        { id: "BK-7831", guest: "Ellen Ripley", room: 101, checkIn: "2023-10-20", checkOut: "2023-10-24", status: "Completed", amount: 1000 },
        { id: "BK-7832", guest: "Marty McFly", room: 203, checkIn: "2023-12-01", checkOut: "2023-12-05", status: "Confirmed", amount: 1200 }
    ],
    guests: [
        { id: 1, name: "Sarah Conner", email: "sarah@example.com", phone: "+1 555-0101", visits: 3, lastStay: "2023-01-15" },
        { id: 2, name: "John Wick", email: "babayaga@continental.com", phone: "+1 555-0102", visits: 12, lastStay: "2022-12-20" },
        { id: 3, name: "Ellen Ripley", email: "ripley@weyland.com", phone: "+1 555-0103", visits: 1, lastStay: "2023-10-20" }
    ],
    stats: {
        occupancy: 68,
        revenue: 12450,
        arrivals: 12,
        departures: 8
    }
};

// Helper Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function renderStatusBadge(status) {
    const styles = {
        'Available': 'bg-green-100 text-green-800',
        'Booked': 'bg-blue-100 text-blue-800',
        'Cleaning': 'bg-yellow-100 text-yellow-800',
        'Maintenance': 'bg-red-100 text-red-800',
        'Active': 'bg-green-100 text-green-800',
        'Pending': 'bg-orange-100 text-orange-800',
        'Completed': 'bg-gray-100 text-gray-800',
        'Confirmed': 'bg-blue-100 text-blue-800'
    };
    return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}">${status}</span>`;
}

// Simple Chart Rendering
class SimpleChart {
    constructor(canvasId, data, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.data = data;
        this.options = options;
        this.padding = 40;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.draw();
    }

    draw() {
        if (this.options.type === 'bar') this.drawBarChart();
    }

    drawBarChart() {
        const { ctx, width, height, padding, data } = this;
        const chartHeight = height - padding * 2;
        const chartWidth = width - padding * 2;
        const maxVal = Math.max(...data.values);
        const barWidth = chartWidth / data.values.length - 10;

        ctx.clearRect(0, 0, width, height);

        // Axis
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.strokeStyle = '#e2e8f0';
        ctx.stroke();

        // Bars
        data.values.forEach((val, index) => {
            const barHeight = (val / maxVal) * chartHeight;
            const x = padding + index * (barWidth + 10) + 10;
            const y = height - padding - barHeight;

            // Draw Bar
            ctx.fillStyle = this.options.color || '#3b82f6';
            ctx.fillRect(x, y, barWidth, barHeight);

            // Label
            ctx.fillStyle = '#64748b';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(data.labels[index], x + barWidth / 2, height - padding + 20);
        });
    }
}


// Initialization & Global Logic
document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check LocalStorage for Theme
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Populate global stats if they exist (Dashboard)
    const occupancyEl = document.getElementById('stat-occupancy');
    if (occupancyEl) occupancyEl.innerText = hotelData.stats.occupancy + '%';
});
