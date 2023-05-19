# Project Guidelines

> **Note**: This guide will act as a set of rules, that are required to be followed by anyone who is contributing into this project. If you have a better way, then feel free to raise an issue against that particular guideline

- Use simple names for files or folders and keep the pattern consistent

- [Write clean code](https://github.com/ryanmcdermott/clean-code-javascript)

- We are following the [Airbnb Style Guide](https://github.com/airbnb/javascript)

## Important points

1. Branch name should follow this format: **(type)/(small-description)**

   | Type         | Example                    | Commit Prefix |
   | ------------ | -------------------------- | ------------- |
   | **Feature**  | feature/small-description  | feat:         |
   | **Bug**      | bug/small-description      | fix:          |
   | **Hot Fix**  | hotfix/small-description   | fix:          |
   | **Docs**     | docs/small-description     | docs:         |
   | **Style**    | style/small-description    | style:        |
   | **Refactor** | refactor/small-description | refactor:     |
   | **Rephrase** | rephrase/small-description | rephrase:     |
   | **Test**     | test/small-description     | test:         |
   | **Chore**    | chore/small-description    | chore:        |
   | **Version**  | version/small-description  | version:      |
   | **WIP**      | WIP/small-description      | WIP:          |
   | **Defaults** | defaults/small-description | defaults:     |
   | **Start**    | start/small-description    | start:        |
   | **Stop**     | stop/small-description     | stop:         |

2. Make sure to create new branch for every ticket.
3. Prefix your commit messages with `fix:`, `feat:`, `chore:`, `version:`, `refactor:`, `style:`, `test:`, `WIP:`, `defaults:`, `rephrase:` , `start:`, `stop:` or `docs:`
4. Write meaningful commit messages, will prefer if every commit also includes ticket number.
5. PR should include ticket url and proper description.

## More Commit Examples

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)
- `version`: (version bump/new release; no production code change)
- `WIP`: (Work In Progress; for intermediate commits to keep patches reasonably sized)
- `defaults`: (changes default options)
- `start` : (Begin doing something; e.g. enable a toggle, feature flag, etc.)
- `stop` : (End doing something; e.g. disable a toggle, feature flag, etc.)
- `rephrase` : (A change that MUST be just textual, e.g. edit a comment, doc, etc.)

## Example

- [feat] Implement automated commit messages
- (Optional) Explain why this change is being made
- |<---- Try To Limit Each Line to a Maximum Of 72 Characters ---->|
- (Optional) Provide links or keys to any relevant tickets, articles or other resources
- Example: Github issue #23

## Remember to

- Capitalize the subject line
- Use the imperative mood in the subject line
- Do not end the subject line with a period
- Separate subject from body with a blank line
- Use the body to explain what and why vs. how
- Can use multiple lines with "-" or "\*" for bullet points in body
