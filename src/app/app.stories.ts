import { Meta, StoryObj } from '@storybook/angular';
import { AppComponent } from './app.component';

const meta: Meta<AppComponent> = {
  title: 'App Component',
  component: AppComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<AppComponent>;

export const Default: Story = {
  args: {
    // define default arguments for the component if needed
  },
};
