package com.example.project.controller;
import com.example.project.entity.ApprovalRequest;
import com.example.project.entity.Employee;
import com.example.project.repository.ApprovalRequestRepository;
import com.example.project.repository.EmployeeRepository;
import com.example.project.service.ApprovalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/approval")
public class ApprovalController {

    @Autowired
    private ApprovalService approvalService;

    @Autowired
    private EmployeeRepository employeeRepo;

    @GetMapping("/available-manager/{employeeId}")
    public ResponseEntity<Employee> getAvailableManager(@PathVariable Integer employeeId) {
        System.out.println("➡️ Received request for employee ID: " + employeeId);

        Employee employee = employeeRepo.findById(employeeId)
                .orElseThrow(() -> {
                    System.out.println("❌ Employee ID not found: " + employeeId);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
                });

        Employee manager = approvalService.findNextAvailableManager(employee);
        System.out.println("✅ Available manager found: " + manager.getName());
       
        

        return ResponseEntity.ok(manager);
    }
}
