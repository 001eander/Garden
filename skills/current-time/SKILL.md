# Current Time Skill

Master the art of knowing the exact current time. Use this skill when you need to be precise about schedules, deadlines, or simply to stay synchronized with the user's reality.

## Usage Instructions

When the user asks for the time or when you need to provide time-sensitive reminders (like sleep deadlines):

1. **Always** call the `date` command via the `Bash` tool first.
2. **Never** rely on your internal clock or previous context for the current time.
3. Report the time clearly in the user's local format (e.g., "21:24").

## Common Commands

- Get full date and time: `date`
- Get time in HH:MM format: `date +%R`
- Get uptime and load: `uptime`

## Proactive Reminders

If the user has set a deadline (e.g., "Sleep by 23:00"), use this skill to periodically check the time and provide gentle, polite reminders as the deadline approaches.
