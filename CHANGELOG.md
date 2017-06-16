# Release Notes

## 0.2 (2017-06-16)

### Added

- Add english translations.

## 0.1.1 (2017-06-13)

### Added

- Add `AuthTestingModuleModule` for testing stuff.
- Add **CHANGELOG.md** file.

### Fixed

- Fix error running `ng build --prod` adding the test directives to the new `AuthTestingModuleModule`.

### Changed

- Clean module imports duplicated, the CoreSharedModule exposes the main imports.
- Rename **readme.md** to **README.md**.
- Run `ng lint`