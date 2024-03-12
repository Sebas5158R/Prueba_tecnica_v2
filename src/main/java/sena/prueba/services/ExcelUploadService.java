package sena.prueba.services;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sena.prueba.models.User;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
@Service
public class ExcelUploadService {

    public static boolean isValidExcelFile(MultipartFile file) {
        return Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    public static List<User> getUserDataFromExcel(InputStream inputStream) {
        List<User> users = new ArrayList<>();

        try {
            XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
            XSSFSheet sheet = workbook.getSheet("users");

            int rowIndex = 0;
            for (Row row : sheet) {
                if (rowIndex == 0) {
                    rowIndex++;
                    continue;
                }
                Iterator<Cell> cellIterator = row.iterator();
                int cellIndex = 0;
                User user = new User();

                while (cellIterator.hasNext()) {
                    Cell cell = cellIterator.next();
                    switch (cellIndex) {
                        case 0 -> user.setNames(cell.getStringCellValue());
                        case 1 -> user.setLastNames(cell.getStringCellValue());
                        case 2 -> user.setEmail(cell.getStringCellValue());
                        case 3 -> user.setDocumentType(cell.getStringCellValue());
                        case 4 -> user.setDocumentNumber((long) cell.getNumericCellValue());
                        case 5 -> user.setPhoneNumber((long) cell.getNumericCellValue());
                        case 6 -> {
                            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                            String plainPassword = cell.getStringCellValue();
                            String hashedPassword = passwordEncoder.encode(plainPassword);
                            user.setPassword(hashedPassword);
                            System.out.println("Passwords " + hashedPassword);
                        }
                        case 7 -> user.setLegal_person(cell.getBooleanCellValue());
                    }
                    cellIndex++;
                }
                System.out.println("Saved");
                users.add(user);
            }

        } catch (IOException e) {
            e.getStackTrace();
        }
        return users;
    }
}
