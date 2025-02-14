// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UserActivityLogger {
    struct LogEntry {
        uint256 timestamp;
        string activity;
    }

    struct User {
        LogEntry[] logs;
        uint256 flagCount;
        bool isBanned;
        mapping(address => bool) votes;
        uint256 voteCount;
    }

    address public admin;
    uint256 public constant MAX_FLAGS_BEFORE_VOTING = 3; // Users need 3 flags before voting starts
    uint256 public constant REQUIRED_VOTES_TO_BAN = 5; // Number of votes needed to finalize ban

    mapping(address => User) private users;

    event LogStored(address indexed user, string activity, uint256 timestamp);
    event UserFlagged(address indexed user, uint256 flagCount);
    event UserVoteToBan(address indexed user, address indexed voter, uint256 voteCount);
    event UserBanned(address indexed user);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier notBanned() {
        require(!users[msg.sender].isBanned, "You are banned from logging activity");
        _;
    }

    constructor() {
        admin = msg.sender; // Deployer is the admin
    }

    function logActivity(string memory _activity) public notBanned {
        users[msg.sender].logs.push(LogEntry(block.timestamp, _activity));
        emit LogStored(msg.sender, _activity, block.timestamp);
    }

    function flagUser(address _user) public {
        require(!users[_user].isBanned, "User is already banned");

        users[_user].flagCount += 1;
        emit UserFlagged(_user, users[_user].flagCount);

        if (users[_user].flagCount >= MAX_FLAGS_BEFORE_VOTING) {
            // Voting process starts
        }
    }

    function voteToBanUser(address _user) public {
        require(!users[_user].isBanned, "User is already banned");
        require(users[_user].flagCount >= MAX_FLAGS_BEFORE_VOTING, "User has not reached flag limit");
        require(!users[_user].votes[msg.sender], "You have already voted");

        users[_user].votes[msg.sender] = true;
        users[_user].voteCount += 1;
        emit UserVoteToBan(_user, msg.sender, users[_user].voteCount);

        if (users[_user].voteCount >= REQUIRED_VOTES_TO_BAN) {
            users[_user].isBanned = true;
            emit UserBanned(_user);
        }
    }

    function adminBanUser(address _user) public onlyAdmin {
        require(!users[_user].isBanned, "User is already banned");
        users[_user].isBanned = true;
        emit UserBanned(_user);
    }

    function getUserLogs(address _user) public view returns (LogEntry[] memory) {
        require(msg.sender == admin || msg.sender == _user, "Access denied");
        return users[_user].logs;
    }

    function isUserBanned(address _user) public view returns (bool) {
        return users[_user].isBanned;
    }
}
