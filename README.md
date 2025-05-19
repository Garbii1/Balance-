md
# Balanceè - Smart Car Repair Booking

Balanceè is a Next.js web application designed to simplify the process of finding and booking car repair services. It leverages AI to recommend and rank repair stations based on user-provided car type and service needs.

## Core Problem Solved

Finding a suitable and available car repair station can be time-consuming. Balanceè aims to streamline this by:
1.  Allowing users to specify their car type and the repair service they need.
2.  Using AI to rank available repair stations based on suitability.
3.  Displaying available time slots for the selected station.
4.  Providing a simple booking confirmation process.

## Key Features

*   **Service and Car Type Selection:** Users can easily select their vehicle type (Sedan, SUV, Truck, etc.) and the required service (Oil Change, Brake Inspection, etc.) from predefined lists.
*   **AI-Powered Station Ranking:** Utilizes a Genkit AI flow (`station-ranking.ts`) to intelligently rank repair stations based on their compatibility with the selected car type and service, as well as other (mocked) factors like services offered.
*   **Station Viewing:** Displays a list of recommended stations with details like name, address, AI-generated rank, and a reason for the ranking.
*   **Time Slot Display:** Allows users to view available (mocked) time slots for a chosen repair station.
*   **Booking Confirmation:** A dialog confirms the booking details once a time slot is selected and booked.
*   **Responsive Design:** Built with Tailwind CSS and ShadCN UI components for a modern and responsive user experience.
*   **State Management:** Uses Zustand for efficient global state management of user selections, station data, and UI states.
*   **Form Validation:** Includes light form validation (e.g., requiring car type and service selection) using React Hook Form and Zod.
*   **Animated Transitions:** Incorporates loading skeletons, spinners, and uses ShadCN UI's built-in animations for a smoother user experience.
*   **Dark Mode Toggle:** User-selectable light, dark, and system themes with persistence via localStorage, enhancing user accessibility and preference.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (v15 with App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/) - A collection of beautifully designed, accessible, and customizable components.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
    *   Theming for ShadCN components is configured in `src/app/globals.css` using CSS HSL variables.
*   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) - A small, fast, and scalable state-management solution for managing selections and application state.
*   **AI Integration:** [Genkit (Firebase Genkit)](https://firebase.google.com/docs/genkit) - Used for building and managing AI-powered flows.
    *   Utilizes Google's Gemini models (configured in `src/ai/genkit.ts`).
*   **Form Handling & Validation:**
    *   [React Hook Form](https://react-hook-form.com/) for managing form state and validation.
    *   [Zod](https://zod.dev/) for defining and validating data schemas, especially for forms and AI flow inputs/outputs.
*   **Icons:** [Lucide Icons (lucide-react)](https://lucide.dev/) - A simply beautiful open-source icon set.
*   **Theme Management:** Custom `ThemeProvider` using React Context for light/dark/system theme toggling.

## AI Features (Genkit Flows)

The application utilizes Genkit to integrate AI capabilities. The core AI logic resides in the `src/ai/flows/` directory.

### 1. Station Ranking (`src/ai/flows/station-ranking.ts`)
*   **Purpose:** To rank repair stations based on their suitability for the user's car type and selected service.
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
*   **Purpose:** (Currently part of the codebase but not directly integrated into the main UI flow) To recommend specific repair services based on a user's description of a car issue and their car type.
*   **Input (`RecommendServicesInput`):**
    *   `carType`: The type of car.
    *   `issueDescription`: A textual description of the problem the car is experiencing.
*   **Output (`RecommendServicesOutput`):**
    *   `recommendedServices`: An array of strings listing suggested repair services.
*   **Process:** This flow would prompt an LLM (Gemini) to act as an expert automotive technician and suggest relevant services based on the provided car type and issue description.

### Genkit Configuration (`src/ai/genkit.ts`)
This file initializes and configures Genkit, specifying the `googleAI` plugin and setting `googleai/gemini-2.0-flash` as the default model.

## Project Structure

*   `src/app/page.tsx`: The main entry point and primary page for the Balanceè application. It orchestrates the different components and manages the overall booking flow.
*   `src/components/balancee/`: Contains the custom React components specific to the Balanceè application logic (e.g., `ServiceSelectionForm.tsx`, `StationList.tsx`, `TimeSlotDisplay.tsx`, `BookingConfirmationDialog.tsx`, `theme-provider.tsx`, `theme-toggle-button.tsx`).
*   `src/components/ui/`: Houses the ShadCN UI components that have been added to the project (e.g., `Button.tsx`, `Card.tsx`, `Select.tsx`).
*   `src/hooks/useBalanceeStore.ts`: Defines the Zustand store for managing global application state, including user selections, station data, loading states, and booking confirmation.
*   `src/hooks/use-toast.ts`: Custom hook for managing toast notifications.
*   `src/hooks/use-mobile.tsx`: Custom hook for detecting mobile viewport.
*   `src/lib/balancee/`:
    *   `data.ts`: Contains mock data for car types, services, repair stations, and a function to simulate fetching time slots. This is crucial for development and demonstration without a live backend.
    *   `types.ts`: Defines TypeScript types and interfaces used throughout the Balanceè feature (e.g., `CarType`, `Service`, `Station`, `RankedStation`).
*   `src/lib/utils.ts`: Utility functions, primarily `cn` for merging Tailwind CSS classes.
*   `src/ai/`:
    *   `genkit.ts`: Configures and initializes the Genkit AI framework.
    *   `dev.ts`: Development server setup for Genkit flows (useful for testing flows independently).
    *   `flows/`: Contains the Genkit AI flow definitions (`station-ranking.ts`, `service-recommendation.ts`).
*   `src/app/layout.tsx`: The root layout for the Next.js application, including metadata, font setup (`Inter`), the `ThemeProvider`, and the Toaster component.
*   `src/app/globals.css`: Global stylesheets, Tailwind CSS base/component/utility layers, and ShadCN UI theme variable definitions (CSS HSL values for colors, radius, etc.).
*   `public/`: Static assets (currently empty).
*   `package.json`: Lists project dependencies and scripts.
*   `next.config.ts`: Next.js configuration file.
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `components.json`: ShadCN UI configuration.

## Design Choices & Rationale

*   **AI-First Approach for Ranking:** Instead of simple filtering, Genkit and an LLM are used to provide more nuanced and justified station rankings. This allows for potentially complex matching logic in the future.
*   **Client-Side State Management (Zustand):** Chosen for its simplicity and minimal boilerplate. It effectively manages the user's selections, fetched data, loading states, and errors across components.
*   **Form Validation & User Feedback:** Light form validation is implemented using React Hook Form and Zod to guide users (e.g., requiring car type and service). Error messages are displayed through the Zustand store and form feedback.
*   **Animated Transitions & UI Feedback:** Loading states are indicated with skeletons and spinners. ShadCN UI components provide inherent animations for a smoother feel.
*   **Theme Customization (Dark Mode):** A `ThemeProvider` and toggle button allow users to switch between light, dark, and system themes, with preferences saved to `localStorage`. This enhances user experience and accessibility.
*   **Mock Data for Rapid Prototyping:** `src/lib/balancee/data.ts` provides static data for stations, services, and time slots. This enabled rapid UI development and testing of the AI flows without needing a backend database. The `getMockTimeSlots` function also simulates API call latency.
*   **ShadCN UI & Tailwind CSS:** This combination offers a rich set of pre-built, accessible components that are highly customizable with Tailwind's utility classes. This accelerates UI development while maintaining a modern aesthetic. The theme is controlled via CSS variables in `globals.css`, allowing for easy visual adjustments.
*   **Server Components & App Router:** Leveraging Next.js's App Router and defaulting to Server Components where appropriate for performance benefits. Client components (`'use client'`) are used when browser-specific APIs or interactivity (hooks like `useState`, `useEffect`) are needed.
*   **Error Handling:** Basic error handling is implemented within the Zustand store (`error` state) and displayed on the main page. Genkit flows inherently handle some level of error management, but more robust application-level error strategies could be added.
*   **Component-Based Architecture:** The UI is broken down into reusable components (e.g., `StationCard`, `ServiceSelectionForm`) to promote modularity and maintainability.
*   **Lucide Icons:** Provides a clean and consistent set of icons.

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
No specific API keys are required for the current mock data setup. If integrating with live Google AI services for Genkit beyond free tiers or for production, you would need to:
1.  Create a `.env` file in the project root.
2.  Add your Google API key:
    ```env
    GOOGLE_API_KEY=your_google_api_key_here
    ```
    *(Currently, the `.env` file is present but empty, and Genkit will use default credentials or application default credentials if available in the environment.)*

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
    This will start the Genkit developer UI, usually at `http://localhost:4000`. *Note: For this application, the Genkit flows are called directly from Next.js server-side actions, so this step is mainly for isolated flow development/testing.*

## Potential Future Enhancements

*   **Real Backend Integration:**
    *   User authentication and accounts.
    *   Database for storing stations, services, user bookings, and reviews.
    *   Real-time availability for time slots.
*   **Expanded AI Features:**
    *   Integrate the `service-recommendation` flow into the UI.
    *   Use AI to generate summaries of station reviews.
    *   Personalized recommendations based on user history.
*   **Map Integration:** Display station locations on a map.
*   **Advanced Filtering and Sorting:** Allow users to filter stations by more criteria (e.g., specific amenities, distance).
*   **Notifications:** For booking confirmations and reminders.
*   **Image Generation for Stations:** Use an AI image generation flow to create unique placeholder images for stations if real ones aren't available.
*   **Detailed Error Reporting:** Implement a more robust error tracking system.

---

This README provides an overview of the Balanceè project. For more detailed information on specific technologies, please refer to their respective documentation.
