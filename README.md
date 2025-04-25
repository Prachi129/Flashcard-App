# Flashcard-App
# FlashLearn - SM2 Spaced Repetition System

A modern flashcard application implementing the SuperMemo 2 (SM2) algorithm for efficient learning and long-term retention. Built with React, TypeScript, and Tailwind CSS.

![FlashLearn Screenshot](https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Features

- **SM2 Algorithm Implementation**: Scientifically proven spaced repetition system
- **Adaptive Learning**: Automatically adjusts review intervals based on performance
- **Progress Tracking**: Detailed statistics and learning progress visualization
- **Dark Mode Support**: Comfortable viewing experience in any lighting condition
- **Responsive Design**: Works seamlessly across all devices
- **Performance Analytics**: Track your learning progress with detailed statistics

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand (State Management)
- Recharts (Data Visualization)
- Lucide React (Icons)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flashlearn.git
   cd flashlearn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## How It Works

### SM2 Algorithm

FlashLearn uses the SuperMemo 2 algorithm with the following components:

1. **Recall Quality (0-5)**:
   - 5: Perfect recall
   - 4: Correct with hesitation
   - 3: Correct but difficult
   - 2: Incorrect, remembered after hint
   - 1: Incorrect, wrong guess
   - 0: Complete blackout

2. **Ease Factor (EF)**:
   - Starts at 2.5
   - Updates based on recall quality
   - Minimum value of 1.3
   - Formula: `EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))`

3. **Interval Calculation**:
   - First successful recall: 1 day
   - Second successful recall: 6 days
   - Subsequent intervals: previous_interval * EF

## Project Structure

```
src/
├── components/        # React components
├── contexts/         # Context providers
├── hooks/            # Custom React hooks
├── store/           # Zustand store
├── types/           # TypeScript definitions
└── utils/           # Helper functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- SuperMemo 2 Algorithm by Piotr Wozniak
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Zustand](https://github.com/pmndrs/zustand)
