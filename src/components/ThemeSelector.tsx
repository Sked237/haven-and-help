import { Sun, Moon, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "normal" as const, label: "Normal", icon: Sun },
    { value: "dark" as const, label: "Sombre", icon: Moon },
    { value: "deuteranopia" as const, label: "Daltonien", icon: Eye },
  ];

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];
  const Icon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="transition-all hover:rotate-12">
          <Icon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => {
          const ThemeIcon = t.icon;
          return (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={theme === t.value ? "bg-muted" : ""}
            >
              <ThemeIcon className="w-4 h-4 mr-2" />
              {t.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
