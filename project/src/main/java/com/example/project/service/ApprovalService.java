package com.example.project.service;

import com.example.project.entity.ApprovalRequest;
import com.example.project.entity.Employee;
import com.example.project.repository.ApprovalRequestRepository;
import com.example.project.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ApprovalService {

    private final ApprovalRequestRepository approvalRepo;
    private final EmployeeRepository employeeRepo;
    @Autowired
    public ApprovalService(ApprovalRequestRepository approvalRepo, EmployeeRepository employeeRepo) {
        this.approvalRepo = approvalRepo;
        this.employeeRepo = employeeRepo;
    }

   /* public ApprovalRequest createApproval(Long requestorId) {
        Employee requestor = employeeRepo.findById(requestorId)
                .orElseThrow(() -> new IllegalArgumentException("Requestor not found with ID: " + requestorId));

        Employee approver;
        if (Boolean.TRUE.equals(requestor.getAvailable())) {
            approver = requestor;
            System.out.println("Requestor is available. Approval granted by: " + approver.getName());
        } else {
            approver = findNextAvailableManager(requestor);
            System.out.println("Approval granted by: " + approver.getName());
        }

       /* ApprovalRequest request = new ApprovalRequest();
        request.setRequestor(requestor);
        request.setApprover(approver);
        request.setRequestDate(LocalDateTime.now());
        request.setStatus("Pending");

        return approvalRepo.save(request);
    }*/

    public Employee findNextAvailableManager(Employee employee) {
        Employee currentManager = employee.getManager();

        if (currentManager == null) {
            System.out.println("❌ No manager found for employee ID: " + employee.getEmployeeId());
            throw new RuntimeException("No manager in hierarchy");
        }

        System.out.println("🔍 Checking manager: " + currentManager.getName());

        if (Boolean.TRUE.equals(currentManager.getAvailable())) {
            
            return currentManager;
        }

        return findNextAvailableManager(currentManager);
    }
}