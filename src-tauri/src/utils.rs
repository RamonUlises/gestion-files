use std::fs;
use std::path::Path;

#[allow(dead_code)]
pub fn copy_dir(src: &Path, dst: &Path) -> Result<(), std::io::Error> {
  if !dst.exists() {
      fs::create_dir_all(dst)?;
  }

  for entry in fs::read_dir(src)? {
      let entry = entry?;
      let path = entry.path();
      let new_path = dst.join(entry.file_name());

      if path.is_dir() {
          copy_dir(&path, &new_path)?;
      } else {
          fs::copy(&path, &new_path)?;
      }
  }

  Ok(())
}