
# Balanceè - Smart Car Repair Booking

**My Live Link:** [https://balance-chi.vercel.app/](https://balance-chi.vercel.app/)

I built Balanceè as a Next.js web application to simplify the process of finding and booking car repair services. My goal was to leverage AI to recommend and rank repair stations based on user-provided car type and service needs.

## Core Problem I Aimed to Solve

I noticed finding a suitable and available car repair station can be time-consuming. So, I designed Balanceè to streamline this by:
1.  Allowing users to specify their car type and the repair service they need.
2.  Using AI to rank available repair stations based on suitability.
3.  Displaying available time slots for the selected station.
4.  Providing a simple booking confirmation process.

## Key Features I Implemented

*   **Service and Car Type Selection:** I made it easy for users to select their vehicle type (Sedan, SUV, Truck, etc.) and the required service (Oil Change, Brake Inspection, etc.) from predefined lists.
*   **AI-Powered Station Ranking:** I integrated a Genkit AI flow (`station-ranking.ts`) to intelligently rank repair stations based on their compatibility with the selected car type and service, as well as other (mocked) factors like services offered.
*   **Station Viewing:** The app displays a list of recommended stations with details like name, address, AI-generated rank, and a reason for the ranking.
*   **Time Slot Display:** Users can view available (mocked) time slots for a chosen repair station.
*   **Booking Confirmation:** A dialog confirms the booking details once a time slot is selected and booked.
*   **Responsive Design:** I built the UI with Tailwind CSS and ShadCN UI components for a modern and responsive user experience.
*   **State Management:** I used Zustand for efficient global state management of user selections, station data, and UI states.
*   **Form Validation:** I included light form validation (e.g., requiring car type and service selection) using React Hook Form and Zod.
*   **Animated Transitions:** I incorporated loading skeletons, spinners, and used ShadCN UI's built-in animations for a smoother user experience.
*   **Dark Mode Toggle:** I added a user-selectable light, dark, and system theme toggle with persistence via localStorage, enhancing user accessibility and preference.

## Tech Stack I Chose

*   **Framework:** [Next.js](https://nextjs.org/) (v15 with App Router) - I picked Next.js for its powerful features and focus on performance.
*   **Language:** [TypeScript](https://www.typescriptlang.org/) - To ensure code quality and maintainability.
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/) - I chose ShadCN UI because it offers a collection of beautifully designed, accessible, and customizable components.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - For its utility-first approach which speeds up development.
    *   Theming for ShadCN components is configured in `src/app/globals.css` using CSS HSL variables.
*   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) - I selected Zustand for its simplicity and minimal boilerplate for managing global state.
*   **AI Integration:** [Genkit (Firebase Genkit)](https://firebase.google.com/docs/genkit) - I used Genkit for building and managing the AI-powered flows.
    *   It utilizes Google's Gemini models (configured in `src/ai/genkit.ts`).
*   **Form Handling & Validation:**
    *   [React Hook Form](https://react-hook-form.com/) for managing form state and validation.
    *   [Zod](https://zod.dev/) for defining and validating data schemas, especially for forms and AI flow inputs/outputs.
*   **Icons:** [Lucide Icons (lucide-react)](https://lucide.dev/) - For a clean and consistent set of icons.
*   **Theme Management:** I implemented a custom `ThemeProvider` using React Context for light/dark/system theme toggling, with persistence via `localStorage`.

## AI Features (Genkit Flows) I Developed

I utilized Genkit to integrate AI capabilities. The core AI logic I wrote resides in the `src/ai/flows/` directory.

### 1. Station Ranking (`src/ai/flows/station-ranking.ts`)
*   **Purpose:** I designed this flow to rank repair stations based on their suitability for the user's car type and selected service.
*   **Input (`RankStationsInput`):**
    *   `carType`: The user's selected car type (e.g., "Sedan").
    *   `service`: The user's selected repair service (e.g., "Oil Change").
    *   `stations`: A list of available stations with their `id`, `name`, offered `services`, and supported `carTypes`.
*   **Output (`RankStationsOutput`):** An array of station objects, each including:
    *   `id`: The station's unique identifier.
    *   `name`: The station's name.
    *   `rank`: A numerical rank assigned by the AI (higher is better).
    *   `reason`: A textual explanation from the AI for the assigned rank.
*   **Process:** The flow takes the user's requirements and the list of stations, then prompts the Gemini model to evaluate and rank each station, providing a justification for its ranking.

### 2. Service Recommendation (`src/ai/flows/service-recommendation.ts`)
*   **Purpose:** (This is currently part of the codebase but I haven't directly integrated it into the main UI flow yet) To recommend specific repair services based on a user's description of a car issue and their car type.
*   **Input (`RecommendServicesInput`):**
    *   `carType`: The type of car.
    *   `issueDescription`: A textual description of the problem the car is experiencing.
*   **Output (`RecommendServicesOutput`):**
    *   `recommendedServices`: An array of strings listing suggested repair services.
*   **Process:** This flow would prompt an LLM (Gemini) to act as an expert automotive technician and suggest relevant services based on the provided car type and issue description.

### Genkit Configuration (`src/ai/genkit.ts`)
This file initializes and configures Genkit, specifying the `googleAI` plugin and setting `googleai/gemini-2.0-flash` as the default model I'm using.

## Project Structure

*   `src/app/page.tsx`: The main entry point and primary page for Balanceè. It orchestrates the different components and manages the overall booking flow.
*   `src/components/balancee/`: Contains the custom React components specific to Balanceè's logic (e.g., `ServiceSelectionForm.tsx`, `StationList.tsx`, `TimeSlotDisplay.tsx`, `BookingConfirmationDialog.tsx`, `theme-provider.tsx`, `theme-toggle-button.tsx`).
*   `src/components/ui/`: Houses the ShadCN UI components that have been added to the project (e.g., `Button.tsx`, `Card.tsx`, `Select.tsx`).
*   `src/hooks/useBalanceeStore.ts`: Defines the Zustand store I set up for managing global application state.
*   `src/hooks/use-toast.ts`: Custom hook for managing toast notifications.
*   `src/hooks/use-mobile.tsx`: Custom hook for detecting mobile viewport.
*   `src/lib/balancee/`:
    *   `data.ts`: Contains mock data I created for car types, services, repair stations, and a function to simulate fetching time slots. This was crucial for development and demonstration.
    *   `types.ts`: Defines TypeScript types and interfaces used throughout the Balanceè feature.
*   `src/lib/utils.ts`: Utility functions, primarily `cn` for merging Tailwind CSS classes.
*   `src/ai/`:
    *   `genkit.ts`: Configures and initializes the Genkit AI framework.
    *   `dev.ts`: Development server setup for Genkit flows (useful for testing flows independently).
    *   `flows/`: Contains the Genkit AI flow definitions I wrote (`station-ranking.ts`, `service-recommendation.ts`).
*   `src/app/layout.tsx`: The root layout for the Next.js application.
*   `src/app/globals.css`: Global stylesheets, Tailwind CSS base/component/utility layers, and ShadCN UI theme variable definitions.
*   `public/`: Static assets.
*   `package.json`: Lists project dependencies and scripts.
*   `next.config.ts`: Next.js configuration file.
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `components.json`: ShadCN UI configuration.

## My Design Choices & Rationale

*   **AI-First Approach for Ranking:** I opted for an AI-first approach. Instead of simple filtering, I used Genkit and an LLM to provide more nuanced and justified station rankings. This allows for potentially complex matching logic.
*   **Client-Side State Management (Zustand):** I chose Zustand for its simplicity and minimal boilerplate. It effectively manages the user's selections, fetched data, loading states, and errors across components.
*   **Form Validation & User Feedback:** I implemented light form validation using React Hook Form and Zod to guide users (e.g., requiring car type and service). Error messages are displayed through the Zustand store and form feedback.
*   **Animated Transitions & UI Feedback:** I used loading skeletons and spinners to indicate loading states. ShadCN UI components provide inherent animations for a smoother feel.
*   **Theme Customization (Dark Mode):** I implemented a `ThemeProvider` and toggle button so users can switch between light, dark, and system themes, with preferences saved to `localStorage`. This enhances user experience and accessibility.
*   **Mock Data for Rapid Prototyping:** `src/lib/balancee/data.ts` provides static data for stations, services, and time slots. This enabled me to rapidly develop the UI and test the AI flows without needing a backend database. The `getMockTimeSlots` function also simulates API call latency.
*   **ShadCN UI & Tailwind CSS:** This combination offered me a rich set of pre-built, accessible components that are highly customizable with Tailwind's utility classes. This accelerated UI development while maintaining a modern aesthetic.
*   **Server Components & App Router:** I leveraged Next.js's App Router and defaulted to Server Components where appropriate for performance benefits. Client components (`'use client'`) are used when browser-specific APIs or interactivity are needed.
*   **Error Handling:** I implemented basic error handling within the Zustand store (`error` state) and displayed it on the main page.
*   **Component-Based Architecture:** I broke down the UI into reusable components (e.g., `StationCard`, `ServiceSelectionForm`) to promote modularity and maintainability.
*   **Lucide Icons:** These provide a clean and consistent set of icons.

## Bonus Points Implementation

I made sure to cover the bonus points:
*   **State Management (Zustand):** I used `useBalanceeStore` to manage all key application states.
*   **Form Validation:** For form validation, I used `react-hook-form` and `Zod` in `ServiceSelectionForm` to validate selections.
*   **Animated Transitions:** Loading skeletons are used for station lists, and spinners indicate loading. ShadCN UI components provide subtle default animations.
*   **Dark Mode Toggle:** I added a theme provider (`src/components/balancee/theme-provider.tsx`) and a toggle button (`src/components/balancee/theme-toggle-button.tsx`) for theme switching.

## Getting Started

### Prerequisites
*   Node.js (LTS version recommended)
*   npm or yarn

### Installation
1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```

### Environment Variables
For the Genkit AI flows to work when deployed (e.g., on Vercel), you need to set up a Google Cloud API key.
1.  Create a `.env` file in the project root (this file is in `.gitignore` and should not be committed with the key).
2.  Add your Google API key:
    ```env
    GOOGLE_API_KEY=your_google_api_key_here
    ```
    When deploying to Vercel, set this as an environment variable in the Vercel project settings.

### Running the Application

1.  **Start the Next.js development server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:9002`.

2.  **(Optional) Start the Genkit development server:**
    If you want to test or debug Genkit flows independently, you can run:
    ```bash
    npm run genkit:dev
    ```
    Or for watching changes:
    ```bash
    npm run genkit:watch
    ```
    This will start the Genkit developer UI, usually at `http://localhost:4000`. *Note: For this application, I call the Genkit flows directly from Next.js server-side actions, so this step is mainly for isolated flow development/testing.*

## Deployment to Vercel

This application is configured for easy deployment to [Vercel](https://vercel.com/).

1.  **Push to Git:** Ensure your code is pushed to a GitHub, GitLab, or Bitbucket repository.
2.  **Import to Vercel:**
    *   Sign up or log in to Vercel.
    *   Click "Add New..." > "Project".
    *   Import your Git repository. Vercel will automatically detect it as a Next.js project.
3.  **Configure Environment Variables:**
    *   In your Vercel project settings, navigate to "Environment Variables".
    *   Add `GOOGLE_API_KEY` with your Google Cloud API key value. This is crucial for the AI features to work in the deployed environment.
4.  **Deploy:** Click the "Deploy" button. Vercel will build and deploy your application.

**My Live Link:** [https://balance-chi.vercel.app/](https://balance-chi.vercel.app/)

## Potential Future Enhancements (My Ideas)

*   **Real Backend Integration:**
    *   User authentication and accounts.
    *   Database for storing stations, services, user bookings, and reviews.
    *   Real-time availability for time slots.
*   **Expanded AI Features:**
    *   Integrate the `service-recommendation` flow into the UI.
    *   Use AI to generate summaries of station reviews.
    *   Personalized recommendations based on user history.
*   **Map Integration:** Display station locations on a map.
*   **Advanced Filtering and Sorting:** Allow users to filter stations by more criteria.
*   **Notifications:** For booking confirmations and reminders.
*   **Image Generation for Stations:** Use an AI image generation flow to create unique placeholder images.
*   **Detailed Error Reporting:** Implement a more robust error tracking system.

---
